import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBW878au3rxLfEqF-e4oYnH8cmrMXtv16A',
	authDomain: 'vue-chat-7ee30.firebaseapp.com',
	databaseURL: 'https://vue-chat-7ee30.firebaseio.com',
	projectId: 'vue-chat-7ee30',
	storageBucket: 'vue-chat-7ee30.appspot.com',
	messagingSenderId: '244547660152',
	appId: '1:244547660152:web:4cb4e33c4ae518b394008d'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
