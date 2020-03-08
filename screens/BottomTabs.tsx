import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Todos from './Todos';
import Account from './Account';

const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Todos"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName = '';
          if (route.name === 'Todos') {
            iconName = 'assignment';
          } else if (route.name === 'Account') {
            iconName = 'account-circle';
          }
          return (
            <MaterialIcons
              name={iconName}
              size={28}
              color={focused ? '#f4511e' : '#ccc'}
            />
          );
        },
        tabBarOptions: {
          style: {backgroundColor: '#FFF'},
          activeTintColor: '#f4511e',
        },
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        },
      })}>
      <BottomTab.Screen name="Todos" component={Todos} />
      <BottomTab.Screen name="Account" component={Account} />
    </BottomTab.Navigator>
  );
}

export default BottomTabs;
