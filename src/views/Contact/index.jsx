import React from 'react';
import { TouchableOpacity } from 'react-native';
import ContactDetail from '../../components/ContactDetail';
import EditButton from '../../components/EditContactButton'
import * as contactService from '../../services/contactService';

export default class Contact extends React.Component {
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
    this.props.navigation.state.params.updateState();
    const { navigate } = this.props.navigation;
    return (
      <>
        <ContactDetail
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('EditContact', { updateState: this.fetchContacts.bind(this),
              contactName: this.props.navigation.state.params.contactName,
              contactPhoneNumber: this.props.navigation.state.params.contactPhoneNumber,
              contactId: this.props.navigation.state.params.contactId,
              contactPhoto: this.props.navigation.state.params.contactPhoto
            });
          }}

        >
          <EditButton />
        </TouchableOpacity>
      </>
    );
  }
}
