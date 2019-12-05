import React from 'react';
import { View, FlatList } from 'react-native';
import ContactRow from '../ContactRow';
import styles from './styles'

const ContactsList = ({ contacts, navigation, updateState }) => (
  <View style={styles.container}>
    <FlatList
      style={styles.row}
      numColumns={1}
      data={contacts}
      renderItem={({
        item: {
          contactId, contactName, contactPhoto, contactPhoneNumber
        }
      }) => (
        <ContactRow
          contactId={contactId}
          contactName={contactName}
          contactPhoto={contactPhoto}
          contactPhoneNumber={contactPhoneNumber}
          navigation={navigation}
          updateState={updateState}
        />
      )}
      keyExtractor={(contact) => contact.contactId}
    />
  </View>
);

export default ContactsList;
