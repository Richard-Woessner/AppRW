import { Alert } from 'react-native';

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const DisplayAlert = (params: {
  title: string;
  message?: string;
  onConfirm?: () => void;
}) => {
  const { title, message, onConfirm } = params;
  Alert.alert(
    title,
    message || '',
    [
      {
        text: 'OK',
        onPress: onConfirm,
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
    }
  );
};

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateSignUp = (email: string, password: string, confirmPassword: string) => {
  if (!email || !password || !confirmPassword) {
    DisplayAlert({
      title: 'Error',
      message: 'Please fill out all fields',
    });
    return false;
  }
  if (password !== confirmPassword) {
    DisplayAlert({
      title: 'Error',
      message: 'Passwords do not match',
    });
    return false;
  }
  if (!validateEmail(email)) {
    DisplayAlert({
      title: 'Error',
      message: 'Invalid email',
    });
    return false;
  }
  return true;
};

export const validateSignIn = (email: string, password: string) => {
  if (!email || !password) {
    DisplayAlert({
      title: 'Error',
      message: 'Please fill out all fields',
    });
    return false;
  }
  if (!validateEmail(email)) {
    DisplayAlert({
      title: 'Error',
      message: 'Invalid email',
    });
    return false;
  }
  return true;
};
