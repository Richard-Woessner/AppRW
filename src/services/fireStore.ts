import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

const db = getFirestore(app);

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot;
  } catch (error) {
    console.error(error);
  }
};

export const fsGetData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;
  } catch (error) {
    console.error(error);
  }
};

export const postData = async (col: string, data: object) => {
  try {
    const docRef = await addDoc(collection(db, col), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (error) {
    console.error(error);
  }
};
