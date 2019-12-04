import React from 'react';
import {
  View, Text, Image, Button
} from 'react-native';
import { Linking } from 'expo';
import styles from './styles'


export default class ContactDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    const phoneNumber = navigation.getParam('contactPhoneNumber', 'default value');
    return (
      <View style={styles.container}>
        <Image source={{ uri: navigation.getParam('contactPhoto', 'default value') }} style={styles.image}/>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.info}> {navigation.getParam('contactName', 'default value')}</Text>
        <Text style={styles.header}>Phonenumber </Text>
        <Button
          style={styles.info}
          title={phoneNumber}
          onPress={() => { Linking.openURL(`tel:${phoneNumber}`); }}
        />
      </View>
    );
  }
}
