import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storage.config"

import { AppError } from "@utils/AppError";

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token }));
}

export async function storageAuthTokenGet() {
  try {
    const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

    if (!response) {
      throw new AppError("Token não encontrado", 400);
    }

    const [token, refresh_token] = response.split(".");
    return { token, refresh_token };

  } catch (error) {
    throw error;
  }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}