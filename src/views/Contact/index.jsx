import React from 'react';
import { TouchableOpacity } from 'react-native';
import ContactDetail from '../../components/ContactDetail';
import EditButton from '../../components/EditContactButton'
import contacts from '../../components/ContactList'


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

  render() {
    console.log(this.props.navigation.state.params)
    const { navigate } = this.props.navigation;
    return (
      <>
        <ContactDetail
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          //onPress={() => { this.props.navigation.navigate('Contacts'); }}
          onPress={() => { this.props.navigation.navigate('EditContact', { contactName: this.props.navigation.state.params.contactName,
          contactPhoneNumber: this.props.navigation.state.params.contactPhoneNumber, contactId: this.props.navigation.state.params.contactId }); }}
          //onPress={() => { this.props.navigation.navigate('NewContact', { updateState: this.fetchContacts.bind(this) }); }}
          >
        <EditButton />
        </TouchableOpacity>
      </>
    );
  }
}
