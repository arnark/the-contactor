import React from 'react';
import { View, FlatList } from 'react-native';
import ContactRow from '../ContactRow';
import styles from './styles'

const ContactsList = ({ contacts, navigation }) => (
  <View style={ styles.container }>
    <FlatList
      style = {styles.row}
      numColumns={1}
      data={contacts}
      renderItem={({ item: { contactId, contactName, contactPhoto} }) => (
        <ContactRow
          contactId={contactId}
          contactName={contactName}
          contactPhoto={contactPhoto}
          navigation={navigation}
        />
      )}
      //keyExtractor={(contact) => contact.contactId.toString()}
    />
  </View>
);

export default ContactsList;
