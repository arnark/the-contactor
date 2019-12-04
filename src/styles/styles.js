import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  mainContent: {
    flex: 3,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: 'grey',
    paddingTop: 8
  },
  inputField: {
    height: 40,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 2
  },
  inputFieldLabel: {
    marginLeft: 10,
    marginTop: 7,
    fontSize: 17
  },
  submitButton: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitActionText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  }
});
