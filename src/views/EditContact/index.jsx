import React from 'react';
import EditContactInput from '../../components/EditContactInput';

export default class NewContact extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation)
    return (
      <>
        <EditContactInput
          navigation={this.props.navigation}
          contactName={this.props.navigation.state.params.contactName}
          contactId={this.props.navigation.state.params.contactId}
          contactPhoto={this.props.navigation.state.params.contactPhoto}
          contactPhoneNumber={this.props.navigation.state.params.contactPhoneNumber}
        />
      </>
    );
  }
}
