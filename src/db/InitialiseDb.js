import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClSudY9KXYL9nEqdFJTFa5GybQgNFuRD8",
  authDomain: "splitmybill-637f9.firebaseapp.com",
  databaseURL: "https://splitmybill-637f9-default-rtdb.firebaseio.com",
  projectId: "splitmybill-637f9",
  storageBucket: "splitmybill-637f9.appspot.com",
  messagingSenderId: "910254100903",
  appId: "1:910254100903:web:3f11199ebeb135c5f8e682"
};

// Initialize Firebase
export function intialize(){
    const app = initializeApp(firebaseConfig);
    return getFirestore(app);
}
let db;
(function initialize(){
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
})();

export default db;




