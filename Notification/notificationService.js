import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {

    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('old fcm Token ======', fcmToken)

    if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('new Generate FCM token:', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);

    }catch(error){
        console.log('Error getting FCM token:', error);
    }
    }
}

export const notificationListener = async () => {

      // When the application is opened from a quit state
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });

    // When the application is opened from a quit state
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
    
    // When the application is already opened 
      messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
      })
}