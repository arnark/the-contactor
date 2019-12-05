import React from 'react';
import {
  View, Text, Image, TouchableHighlight
} from 'react-native';
import { Linking } from 'expo';
import styles from './styles'


export default class ContactDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const phoneNumber = navigation.getParam('contactPhoneNumber', 'default value');
    console.log(phoneNumber);
    return (
      <View style={styles.container}>
        <Image source={{ uri: navigation.getParam('contactPhoto', 'default value') }} style={styles.image} />
        <Text style={styles.header}>Name</Text>
        <Text style={styles.info}> {navigation.getParam('contactName', 'default value')}</Text>
        <Text style={styles.header}>Phonenumber </Text>
        <TouchableHighlight onPress={() => { Linking.openURL(`tel:${phoneNumber}`); }}>
          <Text style={styles.info}>{phoneNumber}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
