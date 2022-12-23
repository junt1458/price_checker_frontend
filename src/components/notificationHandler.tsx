import 'firebase/messaging';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { firebaseCloudMessaging } from '../utils/firebase';
import { SERVER_URI } from '../constants';

const NotificationHandler: React.FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  useEffect(() => {
    const setToken = async () => {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log('token', token);
          fetch(SERVER_URI + '/' + token);
        }
      } catch (error) {
        console.error(error);
      }
    };

    setToken();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        const url = event.data.data.url;
        if (url == undefined || url == '') return;

        location.href = event.data.data.url;
      });
    }
  }, []);

  return <>{children}</>;
};

export default NotificationHandler;
