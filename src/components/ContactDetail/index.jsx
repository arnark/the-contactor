import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles'


export default class ContactDetail extends React.Component {
  render() {
    console.log(this.props.navigation.state.params.contactName);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require('./../../../assets/icon.png')} style={styles.image}/>
        <Text style={styles.info}>Name: {this.props.navigation.state.params.contactName}</Text>
        <Text style={styles.info}>Phonenumber: </Text>
      </View>
    );
  }
}
