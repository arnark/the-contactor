import React from 'react';
import { View, Button , Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as contactService from '../../services/contactService';

export default class App extends React.Component {
  importContactsPrompt = async () => {
    Alert.alert(
      'Would you like to import all contacts from your phone?',
      '',
      [
        {
          text: 'Cancel',
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
      this.props.updateState();
      Alert.alert('Contacts were imported successfully.');
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={{ fontSize: 55 }}>
        <Button title="Import Contacts" onPress={this.importContactsPrompt} />
      </View>
    );
  }
}
