import React from 'react';
import { createAppContainer } from 'react-navigation';
import { HeaderBackButton, createStackNavigator } from 'react-navigation-stack';

import Contacts from '../views/Contacts';


export default createAppContainer(createStackNavigator({
  Boards: {
    screen: Contacts,
    navigationOptions: {
      title: 'Contacts',
    }
  }
},
{
  /* The header config from HomeScreen is now here */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2e2c2e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    initialRouteName: 'Contacts',
  },
}));
