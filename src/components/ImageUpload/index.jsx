import * as React from 'react';
import {
  Button, Image, View, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    image: 'default',
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  AsyncAlert = async () => new Promise((resolve) => {
    Alert.alert(
      'How would you like to add the photo?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera Roll',
          onPress: async () => { resolve('camera_roll'); },
        },
        {
          text: 'Take Photo',
          onPress: async () => { resolve('camera'); },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  });

  _pickImage = async () => {
    const method = await this.AsyncAlert();

    let result;
    if (method === 'camera_roll') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    }
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.onImageUpload(result.uri);
    }
  };

  render() {
    const { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Upload an image"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}
