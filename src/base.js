import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAJ05asgcCpJ-eCdBjV-2Q_Gkap-Ekcb0s",
  authDomain: "to-doo-doo.firebaseapp.com",
  databaseURL: "https://to-doo-doo.firebaseio.com",
  projectId: "to-doo-doo",
  storageBucket: "to-doo-doo.appspot.com",
  messagingSenderId: "566741183408"
};

const app = firebase.initializeApp(config)
const database = firebase.database()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { app, database, facebookProvider }
