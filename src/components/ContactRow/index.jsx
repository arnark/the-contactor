import React from 'react';
import { Text, TouchableHighlight, Image } from 'react-native';
import styles from './styles';


const ContactRow = ({ contactId, contactName, contactPhoto, navigation }) => (
  <TouchableHighlight
    onPress={() => { navigation.navigate('Contact', { contactId }); }}
    style={styles.rowContainer}
  >
    <>
      <Text>{contactName}</Text>
      <Image
        style={{ width: 35, height: 35 }}
        source={{ uri: contactPhoto }}
      />
    </>
  </TouchableHighlight>
);

export default ContactRow;
