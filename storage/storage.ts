import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  async storeData(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  }

  async getStoredData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  }

  async doesStoredKeyExist(key: string) {
    let context = this;
    try {
      const data = await AsyncStorage.getItem(key);
      return data != null ? true : false;
    } catch (e) {
      console.error(e);
    }
  }

  async removeStoredData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
}

const storage = new Storage();

export default storage;
