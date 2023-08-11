import { View, StyleSheet } from 'react-native';
import { Text } from '../typography/Text';
import { Icon } from '@rneui/themed';

type PostViewProps = {
  user: string;
  title: string;
  body: string;
  rating: number;
  game: string;
};

export const PostView = (props: PostViewProps) => {
  const { user, title, body, rating, game } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="title">{title}</Text>
        <Rating value={rating} />
      </View>
      <Text>{body}</Text>

      <View style={styles.footer}>
        <Text>{user}</Text>
        <Text>{game}</Text>
      </View>
    </View>
  );
};

const Rating = (props: { value: number }) => {
  const { value } = props;
  const checks = [];
  for (let i = 0; i < value; i++) {
    checks.push(<Icon key={`key${i}`} name="check" size={20} color="green" />);
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      {checks.map((check) => {
        return check;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
