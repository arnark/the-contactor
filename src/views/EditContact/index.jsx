import React from 'react';
import EditContactInput from '../../components/EditContactInput';

export default class NewContact extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <EditContactInput
          navigation={this.props.navigation}
        />
      </>
    );
  }
}
