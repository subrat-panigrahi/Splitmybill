import { collection, getDocs, addDoc } from "firebase/firestore"; 
import db from './InitialiseDb';

export async function getData(model){
    let response = [];
    const data = await getDocs(collection(db, model));
    data.forEach((doc) => {
        response.push(doc.data())
      });
    return response;
} 

export async function postData(model,data){
   const response = await addDoc(collection(db, model), data);
   return response;
}
