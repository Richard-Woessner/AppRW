import { Button as ButtonElement } from '@rneui/themed';

export const Button = (props: {
  onPress: () => void;
  title: string;
  type: 'solid' | 'clear' | 'outline';
}) => {
  const { onPress, title, type } = props;
  return <ButtonElement title={title} type={type} onPress={onPress} />;
};
