import Transaction from '../Transaction';

export default function TransactionList({ transactions, isLoading }) {
    if(isLoading){
        return <div>Loading.....</div>
    }
  return (
    <div>
      {!isLoading && transactions.length ? (
        transactions.map((transaction) => {
          return (
            <Transaction
              name={transaction.name}
              type={transaction.type}
              amount={transaction.amount}
              text={transaction.text}
            />
          );
        })
      ) : (
        <div>You are settled!</div>
      )}
    </div>
  );
}
