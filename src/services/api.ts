import axios, { Axios, AxiosError, AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/StorageAuthToken";

type SignOutProps = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOutProps) => () => void;
};
const api = axios.create({
  baseURL: "http://192.168.1.105:3333",
}) as APIInstanceProps;

let failedQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },

                onFailure: (error: AxiosError) => reject(error),
              });
            });
          }
          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post(`/sessions/refresh-token`, {
                refresh_token,
              });
              await storageAuthTokenSave(data.token);
              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };

              failedQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              resolve(api(originalRequestConfig));

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }
      if (requestError.response && requestError.response.data) {
        return Promise.reject(
          new AppError(
            requestError.response.data.message,
            requestError.response.status
          )
        );
      } else {
        return Promise.reject(requestError);
      }
    }
  );
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };