import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {BottomTabs, Signin as SigninComponent} from '../../screens';
import {authReducer, authInitState} from './reducer';
import {
  restoreToken,
  signInRequest,
  signInSuccess,
  signInFailure,
  signOut,
} from './actions';
import {UserType} from './types';

type AuthContextProps = {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  user: UserType;
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
      if (token) {
        dispatch(restoreToken(token));
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        dispatch(signInRequest());
        try {
          const {token} = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          }).then(res => res.json());

          await AsyncStorage.setItem('token', token);
          dispatch(signInSuccess(email, token));
        } catch (e) {
          dispatch(signInFailure(e));
        }
      },
      signOut: () => dispatch(signOut()),
      loading: state.loading,
      user: state.user,
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
