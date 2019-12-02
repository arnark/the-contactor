import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as contactService from '../../services/contactService';


export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.t = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
    });

    const getAllContacts = async () => {
      const allContacts = await contactService.getAllContacts();
      alert(allContacts);
    }

    const createNewContact = async (contactName, contactPhoneNumber, contactPhoto) => {
      const createContact =
        await contactService.createNewContact(contactName, contactPhoneNumber, contactPhoto);
      alert(JSON.stringify(createContact));
    }

    createNewContact('testname', 'asdf', 'sd')
    createNewContact('testname2', 'asdf', 'sd')
    createNewContact('testname3', 'asdf', 'sd')

    getAllContacts()

}

  componentWillUnmount() {
    this.focusListener.remove();
    clearTimeout(this.t);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <TouchableOpacity>
          <Text>Create new shit</Text>
        </TouchableOpacity>
      </>
    );
  }
}
