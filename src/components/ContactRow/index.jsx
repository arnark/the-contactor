import React from 'react';
import {
  Text, TouchableHighlight, Image, View
} from 'react-native';
import styles from './styles';


const ContactRow = ({ contactId, contactName, contactPhoneNumber, contactPhoto, navigation, updateState }) => (
  <TouchableHighlight
    onPress={() => {
      navigation.navigate('Contact', {
        contactId, contactName, contactPhoneNumber, contactPhoto, updateState
      });
    }}
    style={styles.rowContainer}
    navigation={navigation}
  >
    <View style={styles.rowDataContainer}>
      <Image
        style={styles.imageContainer}
        source={{ uri: contactPhoto }}
      />
      <Text style={styles.contactRowText}>
        {contactName}
      </Text>
    </View>
  </TouchableHighlight>
);

export default ContactRow;
