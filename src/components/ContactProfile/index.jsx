import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles'

const ContactDetails = () => (
    <View style={styles.container}>
      <Image source={require('./../../../assets/icon.png')} style={styles.image}/>
      <Text style={styles.info}>Name: </Text>
      <Text style={styles.info}>Phonenumber: </Text>
    </View>
);

export default ContactDetails;
