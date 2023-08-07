import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GeneralState, User } from '../../src/models/models';
import { useEffect, useState } from 'react';
import { signin, signup } from '../../src/helpers/firebase';
import { UserCredential } from 'firebase/auth';
import { Button as ButtonElement, Input, Icon } from '@rneui/themed';

export interface LoginProps {
  generalState: GeneralState;
  setGeneralState: (g: GeneralState) => void;
}

export const Login = (props: LoginProps) => {
  const { generalState, setGeneralState } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const closeMenu = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  };

  const setUser = (user: User) => {
    console.log('set user');
    console.log(user);

    setGeneralState({
      ...generalState,
      user,
    });
  };

  const signUp = () => {
    signup(email, password)
      .then((user: UserCredential) => {
        console.log('user signed up');

        const u = user.user as unknown as User;
        setUser({
          accessToken: u.accessToken,
          displayName: u.displayName,
          email: u.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (generalState.user) {
      return;
    }

    signin('richardwoesIII@gmail.com', 'password').then((user: UserCredential) => {
      const u = user.user;
      setUser({
        accessToken: u.accessToken,
        displayName: u.displayName,
        email: u.email,
      });
    });
  }, []);

  return (
    <Pressable onPress={closeMenu} style={{ height: '100%', width: '100%' }}>
      <View style={styles.container}>
        <Input placeholder="Email" leftIcon={<Icon name={'email'} size={24} color="black" />} />
        <Input placeholder="Password" leftIcon={<Icon name={'lock'} size={24} color="black" />} />

        <Button title="Log in" type="solid" onPress={signUp} />
        <Button title="Sign Up" type="outline" onPress={() => console.log('sign up')} />
      </View>
    </Pressable>
  );
};

const Button = (props: {
  onPress: () => void;
  title: string;
  type: 'solid' | 'clear' | 'outline';
}) => {
  const { onPress, title, type } = props;
  return <ButtonElement title={title} type={type} onPress={onPress} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    paddingTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
