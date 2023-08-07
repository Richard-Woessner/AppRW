import { View, StyleSheet, Text, Pressable, BackHandler } from 'react-native';
import { GeneralState } from '../../models/models';
import { Link } from 'expo-router';

interface MenuProps {
  generalState: GeneralState;
  setGeneralState: (g: GeneralState) => void;
}

export const Menu = (props: MenuProps) => {
  const { generalState, setGeneralState } = props;
  const { getData } = generalState;

  const openLogin = () => {
    console.log('open login');
    setGeneralState({ ...generalState, page: 'login', menuOpen: false });
  };

  const openHome = () => {
    console.log('open home');
    setGeneralState({ ...generalState, page: 'home', menuOpen: false });
  };

  return (
    <>
      {generalState.menuOpen && (
        <View style={styles.container}>
          <MenuRow text="test" />
          <MenuRow text="test" />
          <MenuRow text="test" />
          <MenuRow text="Home" onPress={openHome} />
          <MenuRow text="Login" onPress={openLogin} />
          <MenuRow text="Refresh" onPress={getData} />
        </View>
      )}
    </>
  );
};

const MenuRow = (props: { text: string; redirect?: string; onPress?: () => void | undefined }) => {
  const { text, onPress } = props;
  const noPress = () => console.log('text120');
  return (
    <View style={styles.row}>
      <Button title={text} onPress={onPress || noPress} />
    </View>
  );
};

const Button = (props: { title: string; onPress?: () => void; redirect?: string }) => {
  const { onPress, redirect, title = 'Save' } = props;

  if (onPress) {
    return (
      <Pressable style={styles.button} onPress={onPress || undefined}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Link href={redirect}>
      <Pressable style={styles.button} onPress={onPress || undefined}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '70%',
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    bottom: 0,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    zIndex: 100,
  },
  row: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: 10,
    marginBottom: '1%',

    backgroundColor: '#35A29F',
  },
  button: {
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
