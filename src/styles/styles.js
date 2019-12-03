import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  mainContent: {
    flex: 3,
    marginTop: 10
  },
  inputField: {
    height: 40,
    padding: 5,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5
  },
  inputFieldLabel: {
    marginLeft: 10,
    marginTop: 7,
    fontSize: 17
  },
  submitButton: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#2e2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  submitActionText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  }
});
