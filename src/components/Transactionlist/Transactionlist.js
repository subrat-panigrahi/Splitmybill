import Transaction from "../Transaction";

export default function TransactionList({transactions}){
    return <div>

    {transactions.map((transaction)=>{
        return <Transaction name={transaction.name} type={transaction.type} amount={transaction.amount} text={transaction.text}/>
    })}
    </div>
}