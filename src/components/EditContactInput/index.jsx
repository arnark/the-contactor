import React from 'react';
import {
  View, TextInput, Text, TouchableHighlight, KeyboardAvoidingView, Alert
} from 'react-native';
import { Formik } from 'formik';
import ImageUpload from '../ImageUpload';
import ImportContacts from '../ImportContacts';
import * as contactService from '../../services/contactService';
import styles from '../../styles/styles'



export default class NewContactInput extends React.Component {
  componentDidMount() {
    this.setState({ imageUri: this.props.navigation.state.params.contactPhoto });
  }

  handleImageUri = (imageUri) => {
    this.setState({ imageUri });
  }

  render() {
    return (
      <Formik
        initialValues={{
          contactName: this.props.navigation.state.params.contactName,
          contactPhoneNumber:  this.props.navigation.state.params.contactPhoneNumber,
          contactPhoto: ''
        }}
        onSubmit={async (values) => {
          const status = await contactService.EditContact(
            this.props.navigation.state.params.contactName,
            values.contactName,
            values.contactPhoneNumber,
            this.state.imageUri
          );
          if (status.status === false) {
            Alert.alert(status.message);
          } else {
            Alert.alert('Contact created successfully!');
            this.props.navigation.state.params.updateState();
            this.props.navigation.navigate('Contacts');
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
              <Text style={styles.inputFieldLabel}>Phone Number</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={handleChange('contactPhoneNumber')}
                onBlur={handleBlur('contactPhoneNumber')}
                value={values.contactPhoneNumber}
              />
              <ImageUpload
                onImageUpload={this.handleImageUri}
                imageUri={this.props.navigation.state.params.contactPhoto}
              />
            </View>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60}>
              <TouchableHighlight
                onPress={handleSubmit}
              >
                <View style={styles.submitButton}>
                  <Text style={styles.submitActionText}>Update Contact</Text>
                </View>
              </TouchableHighlight>
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    );
  }
  }
