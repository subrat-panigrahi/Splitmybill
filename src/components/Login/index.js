import styles from './Login.module.css';
import { validateLogin } from '../../utils/utils';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const user = await validateLogin(e.target[0].value, e.target[1].value);
    if (user) {
      //maintaining the user in localstorage
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('invalid username or password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, []);
  return (
    <div>
      <form onSubmit={onLoginSubmit} className={styles.formWrapper}>
        <h1>Split My Bill</h1>
        <input
          className={styles.input}
          required
          type="text"
          label="username"
          placeholder="Enter user id"
        ></input>
        <input
          className={styles.input}
          required
          type="password"
          label="password"
          placeholder="Enter password"
        ></input>
        <button className={styles.submit} type="submit">
          {' '}
          Login{' '}
        </button>
      </form>
      {error && <div className={styles.error}> {error}</div>}
    </div>
  );
};
export default Login;
