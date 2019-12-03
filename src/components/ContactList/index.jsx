import React from 'react';
import { View, FlatList } from 'react-native';
import ContactRow from '../ContactRow';

const ContactsList = ({ contacts, navigation }) => (
  <View>
    <FlatList
      numColumns={1}
      data={contacts}
      renderItem={({ item: { contactId, contactName, contactPhoto } }) => (
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
