import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyAQu-4V0_KXFsMtcn3JKrBE1TsI2UEvfj4",
  authDomain: "class-finder-541da.firebaseapp.com",
  databaseURL: "https://class-finder-541da.firebaseio.com",
  projectId: "class-finder-541da",
  storageBucket: "class-finder-541da.appspot.com",
  messagingSenderId: "218249369208"
};
var fire = firebase.initializeApp(config);
export default fire;
