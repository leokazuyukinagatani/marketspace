import { createContext, ReactNode, useEffect, useState } from "react";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/StorageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

interface UserAndTokenUpdateProps {
  userData: UserDTO;
  token: string;
}

interface StorageUserAndTokenSaveProps {
  userData: UserDTO;
  token: string;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  function userAndTokenUpdate({ userData, token }: UserAndTokenUpdateProps) {
    //usando o token para atualizar o header de autenticação
   
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  }
  async function storageUserAndTokenSave({
    userData,
    token,
  }: StorageUserAndTokenSaveProps) {
    try {
      console.log("dentro do storageUserAndTokenSave", userData, token);
      setIsLoadingUserStorageData(true);
      console.log("tentando salvar o usuario");
      //TODO debugar aqui
      console.log(userData);
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      console.error("erro ao tentar salvar o  token e o usuário");
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  function verifyUserAndToken({
    userData,
    token,
  }: StorageUserAndTokenSaveProps) {
    console.log("tentando verificar o usuario e o token");
    console.log("userData ===>", userData);
    console.log("token ===>", token);
    if (!userData || !token) throw new Error("Usuário ou token não encontrado");
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      console.log("resposta da api", data);
      verifyUserAndToken({ userData: data.user, token: data.token });
      console.log("tentando salvar o token");

      await storageUserAndTokenSave({ userData: data.user, token: data.token });
      console.log("salvou o token e o usuario");
      userAndTokenUpdate({ userData: data.user, token: data.token });
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserStorageData() {
    try {
      setIsLoadingUserStorageData(true);

      const user = await storageUserGet();
      console.log("usuário vindo do storage fora ===>", user);
      const { token } = await storageAuthTokenGet();

      if (user && token) {
        setUser(user);
        userAndTokenUpdate({ userData: user, token });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}