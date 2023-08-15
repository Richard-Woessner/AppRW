import { View, StyleSheet, Button } from 'react-native';
import { GeneralState } from '../../models/models';
import { useKeyboardVisible } from '../../hooks/useKeyboard';

interface BottomNavProps {
  generalState: GeneralState;
  setGeneralState: (g: GeneralState) => void;
  style?: any;
}

export const BottomNav = (props: BottomNavProps) => {
  const isKeyboardOpen = useKeyboardVisible();
  const { generalState, setGeneralState } = props;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      borderWidth: 1,
      borderColor: '#000',
      bottom: 0,
      ...props.style,
    },
    buttonContainer: {
      flex: 1,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const setMenuOpen = () => {
    console.log('open menu');

    setGeneralState({ ...generalState, menuOpen: true });
  };

  if (isKeyboardOpen) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="menu" onPress={() => setMenuOpen()} />
      </View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};
