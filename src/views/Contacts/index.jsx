import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ContactList from '../../components/ContactList';
import NewContactButton from '../../components/NewContactButton';
import * as contactService from '../../services/contactService';
import styles from './styles';


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

  updateSearch = (text) => {
    this.setState({ searchStr: text });
    this.searchForContacts(text);
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
          <SearchBar
            placeholder="Search.."
            onChangeText={(text) => this.updateSearch(text)}
            value={this.state.searchStr}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
          />

          <ScrollView>
            <ContactList
              contacts={this.state.contacts}
              navigation={this.props.navigation}
            />
          </ScrollView>
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
