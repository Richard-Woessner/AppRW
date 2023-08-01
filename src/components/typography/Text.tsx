import { StyleSheet, Text as TextRn, TextProps as TextPropsRn } from 'react-native';

interface TextProps extends TextPropsRn {
  type?: 'title' | 'subtitle' | 'body' | 'caption';
}

export const Text = (props: TextProps) => {
  const { type = 'body', children } = props;

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    body: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#000',
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      color: '#000',
    },
  });

  const textStyles = styles[type];

  return <TextRn style={textStyles}>{children}</TextRn>;
};
