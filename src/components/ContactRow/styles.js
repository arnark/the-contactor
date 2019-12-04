import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rowContainer: {
    display: 'flex',
    width: 'auto',
    height: 90,
    padding: 5,
    borderBottomWidth: 0.33,
    borderBottomColor: '#E8E8E8',
    backgroundColor: '#fff'
  },
  imageContainer: {
    height: 80,
    width: 80,
    marginLeft: 8,
    marginRight: 8
  },
  contactRowText: {
    fontSize: 18,
    fontWeight: "500"
  },
  rowDataContainer: {
    width: 380,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});
