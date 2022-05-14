import {getData} from '../db/DbUtils';
export function createInitialData(){

}

export function formatNumber(value){
    return Intl.NumberFormat('en-IN',{
        style: "currency",
        currency: "INR",
    }).format(value);
}

export async function validateLogin(userId,password){
    const users = await getData('users');
    let user = users.filter((item) => item.userId === userId && item.password.toString() === password.toString());
    return user.length ? user[0] : null; 
}