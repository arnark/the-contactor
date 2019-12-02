import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Contacts from '../views/Contacts';
import NewContact from '../views/NewContact';
import Contact from '../views/Contact';

export default createAppContainer(createStackNavigator({
  Boards: {
    screen: Contacts,
    navigationOptions: {
      title: 'Contacts',
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      title: 'Contact',
    }
  },
  NewContact: {
    screen: NewContact,
    navigationOptions: {
      title: 'New Contact',
    }
  }
},
{
  /* The header config from HomeScreen is now here */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    initialRouteName: 'Contacts',
  },
}));
