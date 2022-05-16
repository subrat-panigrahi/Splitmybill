import style from './Balance.module.css';
import {formatNumber} from '../../utils/utils';
export default function Balance({title,value,type}){
    let valueStyle = type === 'borrow' ? 'pay' : 'receive';
    if(type === 'total'){
        if(value < 0 ){
            valueStyle = 'pay';
        }
        else {
            valueStyle = 'receive';
        }
    }
    return <div className={style.balanceWrapper}>
        <div className={style.title}>{title}</div>
        <div className={style[valueStyle]}>{formatNumber(value)}</div>
    </div>
}