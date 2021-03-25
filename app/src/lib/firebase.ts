import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyChJe4lkyNSULh7OCZ2t6zT56EvrSZEEgU',
  authDomain: 'assessment-tool-f4f2a.firebaseapp.com',
  projectId: 'assessment-tool-f4f2a',
  storageBucket: 'assessment-tool-f4f2a.appspot.com',
  messagingSenderId: '483174350936',
  appId: '1:483174350936:web:087639822f4c06babf4a2d',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
