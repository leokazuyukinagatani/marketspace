import { UserDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "@storage/storage.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageUserSave(user: UserDTO) {
  console.log("Salvando usuário ===>", user);
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
}

export async function storageUserGet() {
  try {
    const storage = await AsyncStorage.getItem(USER_STORAGE);
    console.log("usuário vindo do storage ===>", storage);
    const user: UserDTO = storage ? JSON.parse(storage) : {};
    console.log("usuário ===>", user);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function storageUserRemove() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    throw error;
  }
}