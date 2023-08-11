import React, { useEffect, useState } from 'react';
import { Home } from './home/home';
import { View, StyleSheet, ScrollView, Dimensions, Pressable, BackHandler } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import storage from '../storage/storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Test } from './test';
import { BottomNav } from '../src/components/bottomNav/BottomNav';
import { setDeviceDimensions } from '../redux/slices/generalSlice';
import { GeneralState, Post } from '../src/models/models';
import { Animated } from 'react-native';
import { Menu } from '../src/components/menu/Menu';
import { login } from '../src/helpers/firebase';
import { fsGetData, getUsers, postData } from '../storage/fireStore';
import { Stack } from 'expo-router';
import { Login } from './login/login';

export default function App() {
  const [generalState, setGeneralState] = useState<GeneralState>({
    page: undefined,
    deviceDimensions: {
      width: 2,
      height: 2,
    },
    menuOpen: false,
    getData: undefined,
    posts: [],
  });
  const [posts, setPosts] = useState<Post[]>([]);

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
    await login();

    await getUsers().then((users) => {
      users.forEach((user) => {
        console.log(user.data());
      });
    });

    const storedKeyExist = await storage.doesStoredKeyExist('posts');

    console.log('no stored key');

    const tempPosts: Post[] = [];

    await fsGetData('posts')
      .then(async (posts) => {
        const p = posts.docs.map((post) => {
          console.log(post.data());

          return {
            postId: post.id,
            ...post.data(),
          } as Post;
        });
        //todo fix issue with general state being set with state post
        console.log(p);

        tempPosts.push(...p);
        await storage.storeData('posts', p);
        setGeneralState({
          ...generalState,
          posts: p as Post[],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // if (!storedKeyExist) {
    //   console.log('no stored key');

    //   await fsGetData('posts').then(async (posts) => {
    //     const p = posts.docs.map((post) => {
    //       return {
    //         postId: post.id,
    //         ...post.data(),
    //       } as Post;
    //     });

    //     await storage.storeData('posts', p);
    //     setGeneralState({
    //       ...generalState,
    //       posts: p as Post[],
    //     });
    //   });
    // } else {
    //   console.log('stored key');

    //   const posts = await storage.getStoredData('posts');

    //   if (posts.length !== 0) {
    //     console.log('using stored data');
    //     console.log(posts);

    //     setGeneralState({
    //       ...generalState,
    //       posts: posts as Post[],
    //     });
    //   } else {
    //     await storage.removeStoredData('posts');
    //     await getData();
    //   }
    // }

    setGeneralState({
      ...generalState,
      page: 'home',
      deviceDimensions: {
        width: 2,
        height: 2,
      },
      getData: getData,
      posts: tempPosts,
    });
  };

  const closeMenu = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  };

  useEffect(() => {
    console.log('layout use effect');

    getData();
  }, []);

  useEffect(() => {
    console.log(generalState);
  }, [generalState]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Menu generalState={generalState} setGeneralState={setGeneralState} />

          <View style={styles.scrollable}>
            {generalState.page === 'home' && (
              <Home generalState={generalState} setGeneralState={setGeneralState} />
            )}
            {generalState.page === 'login' && (
              <Login generalState={generalState} setGeneralState={setGeneralState} />
            )}

            <BottomNav
              generalState={generalState}
              setGeneralState={setGeneralState}
              style={styles.bottom}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    height: '100%',
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
