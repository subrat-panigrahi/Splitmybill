import {formatNumber} from '../utils/utils';
import styles from './Transaction.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Transaction({name,text,amount,type, reason}){
    let valueStyle = type === 'borrow' ? 'pay' : 'receive';
    return <div className={styles.transactionContainer}>
        <div className={styles.iconContainer}>
        <i className='far fa-id-badge'></i>
        <FontAwesomeIcon icon="check-square" />
        </div>
        <div>
        <div className={styles.title}>{name}</div>
        <span> {type === 'debt'? 'owes you' : 'you owe'} </span> <span className={styles[valueStyle]}>{formatNumber(Number(amount))}</span>
        <div>
        {reason}
        </div>
        </div>
    </div>
}