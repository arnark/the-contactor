import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const ContactRow = ({ contactId, contactName, contactPhoto, navigation }) => (
  <TouchableHighlight
    onPress={() => { navigation.navigate('Contact', { contactId }); }}
  >
    <Text>{contactName}</Text>
  </TouchableHighlight>
);

export default ContactRow;
