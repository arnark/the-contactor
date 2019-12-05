import React from 'react';
import { createAppContainer } from 'react-navigation';
import { HeaderBackButton, createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native';

import Contacts from '../views/Contacts';
import NewContact from '../views/NewContact';
import EditContact from '../views/EditContact';
import Contact from '../views/Contact';
import ImportContacts from '../components/ImportContacts';


export default createAppContainer(createStackNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: () => ({
      title: 'Contacts',
      headerTitleStyle: {
        fontSize: 22
      }
    }),
  },
  NewContact: {
    screen: NewContact,
    navigationOptions: ({ navigation }) => ({
      title: 'New Contact',
      headerTitleStyle: {
        fontSize: 22
      },
      headerLeft: <HeaderBackButton onPress={() => { navigation.goBack(); }} title="Contacts" tintColor="#000" backTitleVisible />
    }),
  },
  EditContact: {
    screen: EditContact,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Contact',
      headerTitleStyle: {
        fontSize: 22
      },
      headerLeft: <HeaderBackButton onPress={() => { navigation.goBack(); }} title="Contacts" tintColor="#000" backTitleVisible />
    }),
  },

  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact',
      headerTitleStyle: {
        fontSize: 22
      },
      headerLeft: <HeaderBackButton onPress={() => { navigation.goBack(); }} title="Contacts" tintColor="#000" backTitleVisible />
    }),
  },
  ImportContacts: {
    screen: ImportContacts,
    navigationOptions: ({ navigation }) => ({
      title: 'Import Contacts',
      headerLeft: <HeaderBackButton onPress={() => { navigation.goBack(); }} title="New Contact" tintColor="#000" backTitleVisible />
    }),
  }
},
{
  /* The header config from HomeScreen is now here */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    initialRouteName: 'Contacts',
  },
}));
