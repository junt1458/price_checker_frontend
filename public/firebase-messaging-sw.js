/* eslint-disable */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDwLusKU0td4H3jlgQnp5E2nXhhxDSPzTs",
  authDomain: "price-checker-689a5.firebaseapp.com",
  projectId: "price-checker-689a5",
  storageBucket: "price-checker-689a5.appspot.com",
  messagingSenderId: "247198188694",
  appId: "1:247198188694:web:8e462f2b5a8a5f88dcaeb7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

addEventListener('notificationclick', (event) => {
  alert("click");
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
});