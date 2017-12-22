import * as firebase from 'firebase'

let app

if (firebase.apps.length) {
  app = firebase.apps[0]
} else {
  app = firebase.initializeApp({
    apiKey: 'AIzaSyCqNi61wGMdkAOoZ38aCfleRURBQ_DiCwU',
    authDomain: 'ben-tatum-e8bad.firebaseapp.com',
    databaseURL: 'https://ben-tatum-e8bad.firebaseio.com',
    storageBucket: 'ben-tatum-e8bad.appspot.com',
    projectId: 'ben-tatum-e8bad',
    messagingSenderId: '466561100930'
  })
}

export default app
