import styles from './Layout.module.css';
import { useNavigate } from "react-router-dom";
export default function Layout({ children }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.left}>
  <div className={styles.userName}> Hello, {JSON.parse(localStorage.getItem('user')).name}</div>
          <button className={styles.leftPanelButton} onClick={()=>{logout()}}>Logout</button>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}
