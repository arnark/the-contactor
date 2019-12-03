import React from 'react';
import {
  View, TextInput, Text, TouchableHighlight, KeyboardAvoidingView, Alert
} from 'react-native';
import { Formik } from 'formik';
import * as contactService from '../../services/contactService';
import styles from '../../styles/styles'

const NewContactInput = ({ navigation }) => (
  <Formik
    initialValues={{ contactName: '', contactPhoneNumber: '', contactPhoto: '' }}
    onSubmit={async (values) => {
      const def = (props) => navigation.state.params.updateState;
      const status = await contactService.createNewContact(
        values.contactName, values.contactPhoneNumber, values.contactPhoto
      );
      if (status.status === false) {
        Alert.alert(status.message);
      } else {
        Alert.alert('Contact created successfully!');
        navigation.state.params.updateState();
      }
    }}
  >
    {({
      handleChange, handleBlur, handleSubmit, values
    }) => (
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Text style={styles.inputFieldLabel}>Contact Name</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={handleChange('contactName')}
            onBlur={handleBlur('contactName')}
            value={values.contactName}
          />
          <Text style={styles.inputFieldLabel}>Contact Phone Number</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={handleChange('contactPhoneNumber')}
            onBlur={handleBlur('contactPhoneNumber')}
            value={values.contactPhoneNumber}
          />
          <Text style={styles.inputFieldLabel}>Contact Photo</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={handleChange('contactPhoto')}
            onBlur={handleBlur('contactPhoto')}
            value={values.contactPhoto}
          />
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60}>
          <TouchableHighlight
            onPress={handleSubmit}
          >
            <View style={styles.submitButton}>
              <Text style={styles.submitActionText}>Create Contact</Text>
            </View>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    )}
  </Formik>
);

export default NewContactInput;
