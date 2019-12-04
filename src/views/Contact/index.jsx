import React from 'react';
import ContactDetail from '../../components/ContactDetail';
import EditButton from '../../components/EditContactButton'


export default class Contacts extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <ContactDetail
          navigation={this.props.navigation}
        />
        <EditButton />
      </>
    );
  }
}
