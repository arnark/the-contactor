import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import ContactList from '../../components/ContactList';
import NewContactButton from '../../components/NewContactButton';
import * as contactService from '../../services/contactService';
import styles from './styles';
import globalStyles from '../../styles/styles';


export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  async componentDidMount() {
    await this.fetchContacts();
  }

  async fetchContacts() {
    const contacts = await contactService.getAllContacts();
    this.setState({ contacts });
  }

  async searchForContacts(str) {
    const contacts = await contactService.searchForContacts(str);
    this.setState({ contacts });
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <TextInput
            value={this.state.name}
            onChangeText={(text) => this.searchForContacts(text)}
            style={globalStyles.inputField}
          />

          <ContactList
            contacts={this.state.contacts}
            navigation={this.props.navigation}
          />
        </View>
        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('NewContact', { updateState: this.fetchContacts.bind(this) }); }}
        >
          <NewContactButton />
        </TouchableOpacity>
      </>
    );
  }
}
