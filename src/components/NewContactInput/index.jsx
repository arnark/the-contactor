import React from 'react';
import {
  View, TextInput, Text, TouchableHighlight, KeyboardAvoidingView, Alert, Button
} from 'react-native';
import { Formik } from 'formik';
import { HeaderBackButton } from 'react-navigation-stack';
import ImageUpload from '../ImageUpload';
import * as contactService from '../../services/contactService';
import styles from '../../styles/styles'

export default class NewContactInput extends React.Component {
  componentDidMount() {
    this.setState({ imageUri: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png' });
  }

  handleImageUri = (imageUri) => {
    console.log(imageUri);
    this.setState({ imageUri });
  }

  render() {
    return (
      <Formik
        initialValues={{ contactName: '', contactPhoneNumber: '', contactPhoto: '' }}
        onSubmit={async (values) => {
          const status = await contactService.createNewContact(
            values.contactName, values.contactPhoneNumber, this.state.imageUri
          );
          if (status.status === false) {
            Alert.alert(status.message);
          } else {
            Alert.alert('Contact created successfully!');
            this.props.navigation.state.params.updateState();
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
              <ImageUpload
                onImageUpload={this.handleImageUri}
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
  }
}
