import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles'


export default class ContactDetail extends React.Component {
  render() {
    console.log(this.props.navigation.state.params.contactPhoneNumber);
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: navigation.getParam('contactPhoto', 'default value') }} style={styles.image}/>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.info}> {navigation.getParam('contactName', 'default value')}</Text>
        <Text style={styles.header}>Phonenumber </Text>
        <Text style={styles.info}> {navigation.getParam('contactPhoneNumber', 'default value')} </Text>
      </View>
    );
  }
}
