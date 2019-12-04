import React from 'react';
import NewContactInput from '../../components/NewContactInput';

export default class Contacts extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <NewContactInput
          navigation={this.props.navigation}
        />
      </>
    );
  }
}
