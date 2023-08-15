import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { GeneralState, User } from '../../src/models/models';
import { useEffect, useState } from 'react';
import { signin, signup } from '../../src/helpers/firebase';
import { UserCredential } from 'firebase/auth';
import { Button as ButtonElement, Input, Icon, Tab, TabView } from '@rneui/themed';
import { DisplayAlert, validateSignIn, validateSignUp } from '../../src/helpers/func';
import { useKeyboardVisible } from '../../src/hooks/useKeyboard';
import { UseAuth } from '../../src/providers/authProvider';

export interface LoginProps {
  generalState: GeneralState;
  setGeneralState: (g: GeneralState) => void;
  user: User;
  setUser: (user: User) => void;
}

export const Login = (props: LoginProps) => {
  const authProvider = UseAuth();
  const { generalState, setGeneralState, user, setUser } = props;
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

  const signUp = () => {
    const { email, password, confirmPassword } = signUpForm;

    if (!validateSignUp(email, password, confirmPassword)) {
      return;
    }

    authProvider.signUp(email, password).then((user) => {
      console.log(user);

      DisplayAlert({ title: `Hello ${user.displayName}`, onConfirm: redirectHome });
    });
  };

  const signIn = () => {
    const { email, password } = signInForm;

    if (!validateSignIn(email, password)) {
      return;
    }

    authProvider.login(email, password).then((user) => {
      console.log(user);

      DisplayAlert({ title: `Hello ${user.displayName}`, onConfirm: redirectHome });
    });
  };

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
