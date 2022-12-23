const getServerURI = (): string => {
  if (process.browser) {
    const domain = document.domain.toLowerCase();
    if (domain === 'pc-dev.db0.jp') {
      return 'http://localhost:9002';
    }
  }
  return 'https://pc-api.db0.jp';
};

export const SERVER_URI = getServerURI();

export const firebaseConfig = {
  apiKey: 'AIzaSyDwLusKU0td4H3jlgQnp5E2nXhhxDSPzTs',
  authDomain: 'price-checker-689a5.firebaseapp.com',
  projectId: 'price-checker-689a5',
  storageBucket: 'price-checker-689a5.appspot.com',
  messagingSenderId: '247198188694',
  appId: '1:247198188694:web:8e462f2b5a8a5f88dcaeb7',
};

export const vapidKey =
  'BLwVyfiD3Jx-7lp2o1jms5uuGczD-C9xRNUqMtNRCpuYLBQOJj6OeAZpmXuAPIclED4b8jzEYxpH_lz_wKBItIs';
