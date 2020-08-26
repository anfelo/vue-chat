import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: '***********************',
	authDomain: '***********************',
	databaseURL: '***********************',
	projectId: '***********************',
	storageBucket: '***********************',
	messagingSenderId: '***********************',
	appId: '***********************'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
