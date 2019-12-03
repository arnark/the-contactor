import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const NewContactButton = () => (
  <View style={styles.button}>
    <Text style={styles.buttonText}>New Contact</Text>
  </View>
);

export default NewContactButton;
