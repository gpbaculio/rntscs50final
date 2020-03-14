import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {BottomTabs, Signin as SigninComponent} from '../../screens';
import {authReducer, authInitState} from './reducer';
import {signInRequest, signInSuccess, signInFailure, signOut} from './actions';
import {UserType} from './types';

type AuthContextProps = {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  user: UserType | null;
};

export type AppStackParamListType = {
  Signin: undefined;
  Home: undefined;
};

const AppStack = createStackNavigator<AppStackParamListType>();

export const AuthContext = React.createContext<Partial<AuthContextProps>>({});

export default function App() {
  const [state, dispatch] = React.useReducer(authReducer, authInitState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user').then(savedUser =>
        savedUser ? JSON.parse(savedUser) : null,
      );
      if (token && user) {
        dispatch(signInSuccess(user, token));
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        dispatch(signInRequest());
        try {
          const userId = 1; // mock
          const {token} = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          }).then(res => res.json());
          const {avatar, phone, name, address} = await fetch(
            `https://5e65ab532aea440016afb25f.mockapi.io/users/${userId}`,
          ).then(res => res.json());
          //just saving cause we cannot fetch user by token
          await AsyncStorage.setItem('token', token);
          const user = {email, avatar, id: userId, phone, name, address};
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(signInSuccess(user, token));
        } catch (e) {
          await AsyncStorage.clear();
          dispatch(signInFailure(e));
        }
      },
      signOut: async () => {
        dispatch(signOut());
        await AsyncStorage.clear();
      },
      loading: state.loading,
      user: state.user || null,
    }),
    [state.loading, state.user],
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <AppStack.Navigator>
          {state.token == null ? (
            <AppStack.Screen name="Signin" component={SigninComponent} />
          ) : (
            <AppStack.Screen name="Home" component={BottomTabs} />
          )}
        </AppStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
