import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Background message handled:', remoteMessage);
});

AppRegistry.registerComponent('Rnfcmclient', () => App);
