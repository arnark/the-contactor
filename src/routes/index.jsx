import React from 'react';
import { createAppContainer } from 'react-navigation';
import { HeaderBackButton, createStackNavigator } from 'react-navigation-stack';
import { Button, View } from 'react-native';

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
    }),
  },
  NewContact: {
    screen: NewContact,
    navigationOptions: ({ navigation }) => ({
      title: 'New Contact',
      headerLeft: <HeaderBackButton onPress={() => { navigation.goBack(); }} title="Contacts" tintColor="#000" backTitleVisible />
    }),
  },
  EditContact: {
    screen: EditContact,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Contact',
      headerLeft: <HeaderBackButton onPress={() => { navigation.goBack(); }} title="Contacts" tintColor="#000" backTitleVisible />
  }),
},

  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact',
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
   /*The header config from HomeScreen is now here*/
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: "center",
      alignSelf: "center",
    },
    initialRouteName: 'Contacts',
  },
}
));
