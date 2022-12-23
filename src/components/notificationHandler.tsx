import 'firebase/messaging';
import { useEffect } from 'react';
import { firebaseCloudMessaging } from '../utils/firebase';
import { SERVER_URI } from '../constants';
import { useLoginState } from '../hooks/useLoginState';
import { parseCookies } from 'nookies';

const NotificationHandler: React.FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  const { isLoginChecking, loginState } = useLoginState();

  useEffect(() => {
    if (isLoginChecking || !loginState) return;

    const setToken = async () => {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          const cookies = parseCookies();

          const req = await fetch(SERVER_URI + '/token_register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + cookies.token,
            },
            body: JSON.stringify({
              device_token: token,
            }),
          });
          const res = await req.json();
          console.log(res);
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
  }, [isLoginChecking, loginState]);

  return <>{children}</>;
};

export default NotificationHandler;
