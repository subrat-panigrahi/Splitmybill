import {formatNumber} from '../utils/utils';
import styles from './Transaction.module.css';
export default function Transaction({name,text,amount,type}){
    let valueStyle = type === 'pay' ? 'pay' : 'receieve';
    return <div className={styles.transactionContainer}>
        <div className={styles.iconContainer}>
        <i class='far fa-id-badge'></i>
        </div>
        <div>
        <div className={styles.title}>{name}</div>
        <span> {text} </span> <span className={styles[valueStyle]}>{formatNumber(amount)}</span>
        </div>
    </div>
}