import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

  async storeData (key: string, value:any) {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        // saving error
      }
    };

  async getData (key:string)  {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
}

const storage = new Storage();

export default storage;