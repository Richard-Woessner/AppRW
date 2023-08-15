import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { User } from '../models/models';
import { fsGetData } from '../services/fireStore';
import { signin, signup } from '../helpers/firebase';
import { UserCredential } from '@firebase/auth';
import { DisplayAlert } from '../helpers/func';

export interface AuthContextType {
  user: User | undefined;
  loading: boolean;

  login: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
}

const initialValues: AuthContextType = {
  user: undefined,
  loading: false,

  login: function (email: string, password: string): Promise<User> {
    throw new Error('Function not implemented.');
  },
  signUp: function (email: string, password: string): Promise<User> {
    throw new Error('Function not implemented.');
  },
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const data = await signin(email, password);

      const u = data.user;

      const tempUser: User = {
        accessToken: u.accessToken,
        displayName: u.displayName ? u.displayName : u.email.split('@')[0],
        email: u.email,
      };

      setUser(tempUser);

      return tempUser;
    } catch (e) {
      console.error(e.message);

      DisplayAlert({
        title: 'Error signing in',
        message: 'Make sure you have the correct email and password',
      });

      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await signup(email, password);

      const u = user.user as unknown as User;

      const tempUser: User = {
        accessToken: u.accessToken,
        displayName: u.displayName ? u.displayName : u.email.split('@')[0],
        email: u.email,
      };

      setUser(tempUser);
      return tempUser;
    } catch (error) {
      console.log(error);
      DisplayAlert({
        title: 'Error signing up',
        message: 'Make sure you have the correct email and password',
      });
      return undefined;
    }
  }, []);

  const values = useMemo(
    () => ({
      user,
      loading,

      login,
      signUp,
    }),
    [user, loading, login, signUp]
  );

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};

export const UseAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider component.');
  }

  return context;
};
