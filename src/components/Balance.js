import './Balance.css';
export default function Balance({title,value,type}){
    let valueStyle = type === 'pay' ? 'pay' : 'receieve';
    if(type === 'total'){
        if(value < 0 ){
            valueStyle = 'pay';
        }
        else {
            valueStyle = 'receieve';
        }
    }
    return <div className='balanceWrapper'>
        <div className='title'>{title}</div>
        <div className={valueStyle}>{Intl.NumberFormat('en-IN',{
    style: "currency",
    currency: "INR",
}).format(value)}</div>
    </div>
}