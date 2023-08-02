import React, { useEffect, useState } from 'react';
import { Home } from './home/home';
import { View, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import storage from '../storage/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Test } from './test/Test';
import { BottomNav } from '../src/components/bottomNav/BottomNav';
import { setDeviceDimensions } from '../redux/slices/generalSlice';
import { GeneralState } from '../src/models/models';
import { Animated } from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

console.log('windowWidth: ', windowWidth);
console.log('windowHeight: ', windowHeight);

export default function App() {
  const [generalState, setGeneralState] = useState<GeneralState>({
    deviceDimensions: {
      width: windowWidth,
      height: windowHeight,
    },
    menuOpen: false,
  });

  const getData = async () => {
    const data = await storage.getData('test');
  };

  const sideMenuStyle = StyleSheet.create([
    {
      ...styles.sideMenu,
      display: generalState.menuOpen ? 'flex' : 'none',
    },
  ]);

  const closeMenu = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  };

  useEffect(() => {
    setGeneralState({
      ...generalState,
      deviceDimensions: {
        width: windowWidth,
        height: windowHeight,
      },
    });
    getData();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={sideMenuStyle[0]}>
          <Test />
        </View>

        <View style={styles.content}>
          <View style={styles.scrollable}>
            <Pressable onPress={closeMenu} style={{ maxHeight: '100%', maxWidth: '100%' }}>
              <Home />
            </Pressable>
          </View>

          <BottomNav
            generalState={generalState}
            setGeneralState={setGeneralState}
            style={styles.bottom}
          />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: windowHeight,
    maxWidth: windowWidth,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  scrollable: {
    maxHeight: '92%',
  },
  bottom: {
    width: '100%',
    height: '8%',
    position: 'absolute',
  },
  sideMenu: {
    height: '100%',
    width: '65%',
    backgroundColor: '#fff',
    position: 'absolute',

    left: 0,
    top: 0,
    zIndex: 100,
  },
});
