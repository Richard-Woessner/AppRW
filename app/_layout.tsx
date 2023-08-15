import React, { useEffect, useState } from 'react';
import { Home } from './home/home';
import { View, StyleSheet, ScrollView, Dimensions, Pressable, BackHandler } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import storage from '../src/services/storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Test } from './test';
import { BottomNav } from '../src/components/bottomNav/BottomNav';
import { setDeviceDimensions } from '../redux/slices/generalSlice';
import { GeneralState, Post } from '../src/models/models';
import { Animated } from 'react-native';
import { Menu } from '../src/components/menu/Menu';
import { login } from '../src/helpers/firebase';
import { fsGetData, getUsers, postData } from '../src/services/fireStore';
import { Stack } from 'expo-router';
import { Login } from './login/login';
import { useKeyboardVisible } from '../src/hooks/useKeyboard';
import { PostContext, PostsProvider, UsePost } from '../src/providers/postProvider';
import Main from './main';
import { AuthProvider } from '../src/providers/authProvider';

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </Provider>
      </PostsProvider>
    </AuthProvider>
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
