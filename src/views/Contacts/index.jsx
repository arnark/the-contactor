import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import ContactList from '../../components/ContactList';
import * as contactService from '../../services/contactService';


export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      loadingContacts: false
    };
  }

  async componentDidMount() {
    await this.fetchContacts();
}

  componentWillUnmount() {
  }

  handleOnPress = async () => {
    contactService.createNewContact((Math.floor(Math.random() * 1000) + 1).toString(), 'test3', 'sadf');
    await this.fetchContacts();
  }

  async fetchContacts() {
    this.setState({ loadingContacts: true });
    const contacts = await contactService.getAllContacts();
    this.setState({ loadingContacts: false, contacts });
  }

  render() {
    return (
      <View>
        <ContactList
          contacts={this.state.contacts}
          navigation={this.props.navigation}
        />

        <Button onPress={this.handleOnPress} title="Create new sstufff" />

      </View>
    );
  }
}
