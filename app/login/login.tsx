import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { GeneralState, User } from '../../src/models/models';
import { useEffect, useState } from 'react';
import { signin, signup } from '../../src/helpers/firebase';
import { UserCredential } from 'firebase/auth';
import { Button as ButtonElement, Input, Icon, Tab, TabView } from '@rneui/themed';
import { DisplayAlert } from '../../src/helpers/func';

export interface LoginProps {
  generalState: GeneralState;
  setGeneralState: (g: GeneralState) => void;
}

export const Login = (props: LoginProps) => {
  const { generalState, setGeneralState } = props;
  const [index, setIndex] = useState(0);
  const [signInForm, setSignInForm] = useState<SignInForm>({
    email: '',
    password: '',
  });
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const closeMenu = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
    });
  };

  const redirectHome = () => {
    setGeneralState({
      ...generalState,
      menuOpen: false,
      page: 'home',
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
    const { email, password, confirmPassword } = signUpForm;

    if (!email || !password || !confirmPassword) {
      console.log('missing fields');
      DisplayAlert({ title: 'Missing fields' });
      return;
    }

    if (password !== confirmPassword) {
      console.log('passwords do not match');
      DisplayAlert({ title: 'Passwords do not match' });

      return;
    }

    signup(email, password)
      .then((user: UserCredential) => {
        console.log('user signed up');

        const u = user.user as unknown as User;
        setUser({
          accessToken: u.accessToken,
          displayName: u.displayName,
          email: u.email,
        });

        DisplayAlert({ title: 'Thank you for signing up!' });
      })
      .catch((err) => {
        console.log(err);
        DisplayAlert({
          title: 'Error signing up',
          message: 'Make sure you have the correct email and password',
        });
      });
  };

  const signIn = () => {
    const { email, password } = signInForm;

    if (!email || !password) {
      console.log('missing fields');
      DisplayAlert({ title: 'Missing fields' });
      return;
    }

    signin(email, password)
      .then((user: UserCredential) => {
        console.log('user signed in');
        console.log(user);

        const u = user.user;
        setUser({
          accessToken: u.accessToken,
          displayName: u.displayName,
          email: u.email,
        });

        const name = user.user.displayName ? user.user.displayName : user.user.email.split('@')[0];

        DisplayAlert({ title: `Hello ${name}`, onConfirm: redirectHome });
        closeMenu();
      })
      .catch(() => {
        DisplayAlert({
          title: 'Error signing in',
          message: 'Make sure you have the correct email and password',
        });
      });
  };

  useEffect(() => {
    if (generalState.user) {
      return;
    }
  }, []);

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item title="Login" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Sign Up" titleStyle={{ fontSize: 12 }} />
      </Tab>

      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        containerStyle={{ height: '100%', borderWidth: 1 }}
      >
        <TabView.Item style={styles.container}>
          <View style={styles.container}>
            <Input
              placeholder="Email"
              leftIcon={<Icon name={'email'} size={24} color="black" />}
              value={signInForm.email}
              onChangeText={(text) => setSignInForm({ ...signInForm, email: text })}
            />
            <Input
              placeholder="Password"
              leftIcon={<Icon name={'lock'} size={24} color="black" />}
              value={signInForm.password}
              onChangeText={(text) => setSignInForm({ ...signInForm, password: text })}
            />

            <Button title="Log in" type="solid" onPress={signIn} />
          </View>
        </TabView.Item>

        <TabView.Item style={styles.container}>
          <View style={styles.container}>
            <Input
              placeholder="Email"
              leftIcon={<Icon name={'email'} size={24} color="black" />}
              value={signUpForm.email}
              onChangeText={(text) => setSignUpForm({ ...signUpForm, email: text })}
            />
            <Input
              placeholder="Password"
              leftIcon={<Icon name={'lock'} size={24} color="black" />}
              value={signUpForm.password}
              onChangeText={(text) => setSignUpForm({ ...signUpForm, password: text })}
            />
            <Input
              placeholder="Confirm Password"
              leftIcon={<Icon name={'lock'} size={24} color="black" />}
              value={signUpForm.confirmPassword}
              onChangeText={(text) => setSignUpForm({ ...signUpForm, confirmPassword: text })}
            />

            <Button title="Sign Up" type="outline" onPress={signUp} />
          </View>
        </TabView.Item>
      </TabView>
    </>
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

interface SignInForm {
  email?: string;
  password?: string;
}

interface SignUpForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
