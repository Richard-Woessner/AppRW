import { View, StyleSheet, Button } from 'react-native';

export const BottomNav = () => {
  return (
    <View style={styles.container}>
      <Button title="test" onPress={() => console.log('test')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#000',
    bottom: 0,
  },
});
