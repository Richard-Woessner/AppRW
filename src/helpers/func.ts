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
