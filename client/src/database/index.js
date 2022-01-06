
import firebase from 'firebase/app'
import {firebaseConfig} from "@/config";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
firebase.initializeApp(firebaseConfig);
const db = firebase
export default db;