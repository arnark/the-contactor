import React from 'react';
import { Text, TouchableHighlight, Image, Alert } from 'react-native';
import styles from './styles';


const ContactRow = ({ contactId, contactName, contactPhoneNumber, contactPhoto, navigation }) => (
  <TouchableHighlight
    onPress={() => {
      navigation.navigate('Contact', {
        contactId, contactName, contactPhoneNumber, contactPhoto
      });
    }}
    style={styles.rowContainer}
    navigation={navigation}
  >
    <>
      <Text style={{ color: 'white' }}>{contactName}</Text>
      <Image
        style={{ width: 35, height: 35 }}
        source={{ uri: contactPhoto }}
      />
    </>
  </TouchableHighlight>
);

export default ContactRow;
