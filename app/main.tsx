import React, { useEffect, useState } from 'react';
import { Home } from './home/home';
import { View, StyleSheet, BackHandler } from 'react-native';
import storage from '../src/services/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { BottomNav } from '../src/components/bottomNav/BottomNav';
import { GeneralState, Post } from '../src/models/models';
import { Menu } from '../src/components/menu/Menu';
import { login } from '../src/helpers/firebase';
import { Login } from './login/login';
import { useKeyboardVisible } from '../src/hooks/useKeyboard';
import { UsePost } from '../src/providers/postProvider';

export default function Main() {
  const postProvider = UsePost();
  const isKeyboardOpen = useKeyboardVisible();
  const [user, setUser] = useState(undefined);

  console.log(postProvider);

  const [generalState, setGeneralState] = useState<GeneralState>({
    page: undefined,
    deviceDimensions: {
      width: 2,
      height: 2,
    },
    menuOpen: false,
    getData: undefined,
    user: undefined,
    isKeyboardOpen: useKeyboardVisible(),
  });

  BackHandler.addEventListener('hardwareBackPress', function () {
    if (generalState.menuOpen) {
      closeMenu();
      return true;
    } else {
      setGeneralState({
        ...generalState,
        page: 'home',
      });
    }
    return false;
  });

  const getData = async () => {
    if (!generalState.user) {
      await login();
    }

    const storedKeyExist = await storage.doesStoredKeyExist('posts');

    console.log('no stored key');

    await postProvider.getPosts();

    setGeneralState({
      ...generalState,
      page: 'home',
      deviceDimensions: {
        width: 2,
        height: 2,
      },
      getData: getData,
    });
  };

  const closeMenu = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  }, [isKeyboardOpen]);

  useEffect(() => {
    console.log('user changed');

    console.log(user);
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Menu generalState={generalState} setGeneralState={setGeneralState} />

      <View style={styles.scrollable}>
        <View style={styles.content}>
          {generalState.page === 'home' && (
            <Home
              generalState={generalState}
              setGeneralState={setGeneralState}
              user={user}
              setUser={setUser}
              postProvider={postProvider}
            />
          )}
          {generalState.page === 'login' && (
            <Login
              generalState={generalState}
              setGeneralState={setGeneralState}
              user={user}
              setUser={setUser}
            />
          )}
        </View>

        {!isKeyboardOpen && (
          <BottomNav
            generalState={generalState}
            setGeneralState={setGeneralState}
            style={styles.bottom}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    height: '92%',
  },
  scrollable: {
    maxHeight: '100%',
    width: '100%',
  },
  bottom: {
    width: '100%',
    height: '8%',
    position: 'absolute',
  },
});
