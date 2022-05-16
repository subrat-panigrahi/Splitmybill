import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrh8spNsEV11BRPwtgpbGE51pK49GdpA0",
  authDomain: "splitbill-681b6.firebaseapp.com",
  projectId: "splitbill-681b6",
  storageBucket: "splitbill-681b6.appspot.com",
  messagingSenderId: "392145239651",
  appId: "1:392145239651:web:442f9e3dba5dfae4764256"
};


let db;
(function initialize(){
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
})();

export default db;




