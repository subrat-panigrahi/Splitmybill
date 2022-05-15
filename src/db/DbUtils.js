import { doc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore"; 
import db from './InitialiseDb';

export async function getData(model){
    let response = [];
    const data = await getDocs(collection(db, model));
    data.forEach((doc) => {
        response.push({id: doc.id, ...doc.data()})
      });
    return response;
} 

export async function postData(model,data){
   const response = await addDoc(collection(db, model), data);
   return response;
}

export async function updateTransaction(id){
  const transactionEntry = doc(db, "transactions", id);
  let response = await updateDoc(transactionEntry, {
    status: 1
  });
  return response;
}
