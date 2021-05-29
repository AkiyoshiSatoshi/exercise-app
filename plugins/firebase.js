import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCaF9IIjMVaONSGJQUlQi1jsYXqPsdqhTA",
      authDomain: "exercise-app-44c5b.firebaseapp.com",
      projectId: "exercise-app-44c5b",
      storageBucket: "exercise-app-44c5b.appspot.com",
      messagingSenderId: "1026379464218",
      appId: "1:1026379464218:web:c0d7eee4ac3e7bb20b5ba3",
      measurementId: "G-X4YT0BYTWB"
    }
  );
}
export default firebase