import React, { useState } from 'react';
import { Home } from './home/home';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import storage from '../storage/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Test } from './test/Test';
import { BottomNav } from '../src/components/bottomNav/BottomNav';

storage.storeData('test', { data: 'test' });

const getData = async () => {
  const data = await storage.getData('test');
  console.log(data);
};

getData();

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Home />
          </View>
          <View style={styles.bottom}>
            <BottomNav />
          </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    width: '100%',
    height: 'auto',
    overflow: 'scroll',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
  },
});
