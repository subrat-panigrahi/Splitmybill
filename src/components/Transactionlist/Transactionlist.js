import Transaction from '../Transaction';
import { useState } from 'react';
import styles from './TransactionList.module.css';

export default function TransactionList({ transactions, isLoading, type }) {
  const [sortBy, setSortBy] = useState('');
  const onSortBySelection = (value) => {
    transactions.sort((val1, val2) => {
      if (value === 'date') {
        return new Date(val2[value]) - new Date(val1[value]);
      } else return val2[value] - val1[value];
    });
    setSortBy(value);
  };
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  console.log(transactions);
  return (
    <div className={styles.listWrapper}>
      <div className={styles.headerWrapper}>
        <div>{type === 'borrow' ? 'you owed' : 'you are owed'}</div>
        <div>
        <select
          name="transactionSortBy"
          onChange={(e) => {
            onSortBySelection(e.target.value);
          }}
          value={sortBy}
          placeholder="Sort by"
        >
          <option value="" selected disabled hidden>
            Sort by
          </option>
          <option
            value="date"
            onChange={(e) => {
              onSortBySelection(e.target.value);
            }}
          >
            Date
          </option>
          <option
            value="amount"
            onChange={(e) => {
              onSortBySelection(e.target.value);
            }}
          >
            Amount
          </option>
        </select>
        </div>
      </div>
      {!isLoading && transactions.length ? (
        transactions.map((transaction,index) => {
          return (
            <Transaction
              name={transaction.name}
              type={transaction.type}
              amount={transaction.amount}
              text={transaction.text}
              reason={transaction.reason}
              key={index}
            />
          );
        })
      ) : (
        <div>You are settled!</div>
      )}
    </div>
  );
}
