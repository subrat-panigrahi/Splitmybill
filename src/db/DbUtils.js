import { collection, getDocs, addDoc } from "firebase/firestore"; 
import db from './InitialiseDb';

export function getData(model){
    getDocs(collection(db, model)).then((querySnapshot)=>{querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });});
}

export function postData(model,data){
    
}