import messaging from '@react-native-firebase/messaging';
//import Storage from '@utils/storage';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';
import API from '../api'

PushNotification.createChannel({
  channelId: 'notification-channel-id',
  channelName: 'notification-channel',
  soundName: 'default',
});
PushNotification.configure({
  onNotification(notification) {
    if (notification) {
      //console.log(notification);
    }
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
const useFCM = () => {
  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
        //console.log('Permission status:', authorizationStatus);
    }
  };

  const getDeviceToken = async () => {
    const token = await messaging().getToken();

    //*Subscribe global notification topic
    messaging().subscribeToTopic('global');

    await API.Settings.update({
      'fcmDeviceToken': token
    });
    return token;
  };

  useEffect(() => {
    //When the application in the foreground
    messaging().onMessage(remoteMessage => {
      PushNotification.localNotification({
        channelId: 'notification-channel-id',
        title: remoteMessage.notification.title,
        bigText: remoteMessage.notification.body, //content for Android
        message: remoteMessage.notification.body, //content for Ios
        ignoreInForeground: false,
        smallIcon: 'ic_notification',
        largeIcon: '',
        ...remoteMessage,
      });
    });

    //When the application is running, but in the background.
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data.link) {
        Linking.openURL(remoteMessage.data.link);
      }
    });

    //When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data.link) {
          console.log(remoteMessage);
          setTimeout(() => {
            Linking.openURL(remoteMessage.data.link);
          }, 1000);
        }
      });
  }, []);

  return {requestUserPermission, getDeviceToken};
};

export default useFCM;
