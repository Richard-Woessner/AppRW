import { View, StyleSheet, Button } from 'react-native';
import { GeneralState } from '../../models/models';

interface BottomNavProps {
  generalState: GeneralState;
  setGeneralState: (g: GeneralState) => void;
  style?: any;
}

export const BottomNav = (props: BottomNavProps) => {
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
      minWidth: props.generalState.deviceDimensions.width / 5,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
    },
  });

  const setMenuOpen = () => {
    console.log('open menu');

    setGeneralState({ ...generalState, menuOpen: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="menu" onPress={() => setMenuOpen()} />
      </View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonContainer}>
        <Button title="test" onPress={() => console.log('test')} />
      </View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};
