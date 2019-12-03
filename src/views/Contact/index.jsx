import React from 'react';
import { Text } from 'react-native';
import ContactDetail from '../../components/ContactDetail';


export default class Contacts extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
      <ContactDetail
        navigation={this.props.navigation}
      />
      </>
    );
  }
}
