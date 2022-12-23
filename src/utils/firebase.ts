import firebase from 'firebase/app';
import 'firebase/messaging';
import { firebaseConfig, vapidKey } from '../constants';

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      try {
        const messaging = firebase.messaging();

        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          const fcm_token = await messaging.getToken({
            vapidKey: vapidKey,
          });

          return fcm_token;
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  },
};

export { firebaseCloudMessaging };
