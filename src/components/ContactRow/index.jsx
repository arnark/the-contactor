import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from './styles';


const ContactRow = ({ contactId, contactName, contactPhoto, navigation }) => (
  <TouchableHighlight
    onPress={() => { navigation.navigate('Contact', { contactId }); }}
    style={styles.rowContainer}
  >
    <Text>{contactName}</Text>
  </TouchableHighlight>
);

export default ContactRow;
