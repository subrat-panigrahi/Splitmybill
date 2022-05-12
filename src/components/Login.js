import styles from './Login.module.css';
import { validateLogin } from '../utils/utils';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
const Login =  () => {
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const onLoginSubmit = (e) => {
        e.preventDefault();
        console.log('e',e);
        const user = validateLogin(e.target[0].value,e.target[1].value);
        if(user){
            console.log('logged in!');
            navigate('/dashboard');
        }
        else{
            setError('invalid username or password');
        }
    }
    return (
        <div>
        <form onSubmit={onLoginSubmit} className={styles.formWrapper}>
            <input className={styles.input} required type='text' label='username'></input>
            <input className={styles.input} required type='password' label='password'></input>
            <button className={styles.submit}type='submit'> Login </button>
        </form>
    {error && <div className={styles.error}> {error}</div>}
        </div>
    )
}
export default Login;