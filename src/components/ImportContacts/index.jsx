import React from 'react';
import { View, Text, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as contactService from '../../services/contactService';

export default class App extends React.Component {
  componentDidMount = async () => {
    Alert.alert(
      'Would you like to import all contacts from your phone?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => this.props.navigation.goBack(),
          style: 'cancel',
        },
        {
          text: 'Import Contacts',
          onPress: async () => this.importContacts(),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  async importContacts() {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      await contactService.importContacts();
      alert('Successs!!!!!');
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View />
    );
  }
}
