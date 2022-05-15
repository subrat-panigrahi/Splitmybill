import {formatNumber} from '../utils/utils';
import styles from './Transaction.module.css';
export default function Transaction({name,text,amount,type}){
    let valueStyle = type === 'borrow' ? 'pay' : 'receive';
    return <div className={styles.transactionContainer}>
        <div className={styles.iconContainer}>
        <i className='far fa-id-badge'></i>
        </div>
        <div>
        <div className={styles.title}>{name}</div>
        <span> {type === 'debt'? 'owes you' : 'you owe'} </span> <span className={styles[valueStyle]}>{formatNumber(Number(amount))}</span>
        </div>
    </div>
}