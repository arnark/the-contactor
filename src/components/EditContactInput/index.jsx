import React from 'react';
import { View, TextInput, Text, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as service from '../../services//contactService';

const EditContactInput = ({ contactId, contactName, contactPhoneNumber, contactPhoto}) => (
  <Text>{contactName} - {contactPhoneNumber} - {contactPhoto} - {contactId}</Text>


);

export default EditContactInput;
