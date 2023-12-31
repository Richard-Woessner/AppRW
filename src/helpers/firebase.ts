import {
  getAuth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { DisplayAlert } from './func';

const auth = getAuth(app);

export const login = async () => {
  try {
    const data = await signInAnonymously(auth);
    return await data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return errorCode;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return await data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return errorCode;
  }
};

export const signin = async (email: string, password: string) => {
  try {
    const data = signInWithEmailAndPassword(auth, email, password);
    return await data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    //DisplayAlert('Error', errorMessage);
    return errorCode;
  }
};
