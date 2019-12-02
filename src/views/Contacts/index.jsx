import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ContactList from '../../components/ContactList';
import NewContactButton from '../../components/NewContactButton';
import * as contactService from '../../services/contactService';
import styles from './styles';

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
      <>
        <View style={styles.container}>
          <ContactList
            contacts={this.state.contacts}
            navigation={this.props.navigation}
          />
        </View>
        <TouchableOpacity
          onPress={this.handleOnPress}
        >
          <NewContactButton />
        </TouchableOpacity>
      </>
    );
  }
}
