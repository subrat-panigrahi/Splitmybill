import HeaderButton from '../HeaderButtons';
import Layout from '../Layout';
import Balance from '../Balance';
import TransactionList from '../Transactionlist/Transactionlist';
import { useEffect, useState } from 'react';
import { getData } from '../../db/DbUtils';
import AddExpense from '../AddExpense';
import SettleExpense from '../SettleExpense';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [addExpenseClicked, setAddExpenseClicked] = useState(false);
  const [settleClicked, setSettleClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //  const [transactionList, setTransactionList] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [accumulatedValue, setAccumulatedValue] = useState({
    borrow: 0,
    debt: 0,
    total: 0,
  });
  const [users, setUsers] = useState([]);
  const calculateTotalValues = (trx) => {
    const output = trx.reduce(
      (acc, tx) => {
        if (tx.type === 'debt') {
          acc.total += tx.amount;
          acc.debt += tx.amount;
        }
        if (tx.type === 'borrow') {
          acc.total -= tx.amount;
          acc.borrow += tx.amount;
        }
        return acc;
      },
      { debt: 0, borrow: 0, total: 0 }
    );
    setAccumulatedValue(output);
  };

  const getUserName = (userArray, id) => {
    const user = userArray.filter((user) => {
      return user.id.toString() === id.toString();
    });
    return user[0].name;
  };

  async function getTransactions() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const transactions = await (await getData('transactions')).filter(
      (item) => item.status === 0
    );
    const users = await getData('users');
    const userTransactions = transactions
      .filter(
        (trans) =>
          trans.user1.toString() === currentUser.id.toString() ||
          trans.user2.toString() === currentUser.id.toString()
      )
      .map((currentTransaction) => {
        let type = '';
        let name = '';
        if (currentTransaction.user2.toString() === currentUser.id.toString()) {
          name = currentTransaction.user1;
          if (currentTransaction.transactionType === 'debt') {
            type = 'borrow';
          }
          if (currentTransaction.transactionType === 'borrow') {
            type = 'debt';
          }
        } else {
          type = currentTransaction.transactionType;
          name = currentTransaction.user2;
        }
        return {
          amount: currentTransaction.amount,
          type: type,
          name: getUserName(users, name),
          userId: currentTransaction.user2,
          reason: currentTransaction.reason,
          id: currentTransaction.id,
          date: currentTransaction.date,
        };
      });
    console.log('hmmmmm', userTransactions);
    //userTransactions.reduce((acc,utx)=>{ return acc;},[]);
    calculateTotalValues(userTransactions);
    setUserTransactions(userTransactions);
    setUsers(users);
    setIsLoading(false);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const onAddExpenseClick = () => {
    setAddExpenseClicked(true);
    setSettleClicked(false);
  };
  const onSettleClick = () => {
    setSettleClicked(true);
    setAddExpenseClicked(false);
  };

  const onExpenseSubmit = () => {
    getTransactions();
    setAddExpenseClicked(false);
    setSettleClicked(false);
  };

  const onSettlement = () => {
    getTransactions();
    setAddExpenseClicked(false);
    setSettleClicked(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <HeaderButton
            onAddExpense={onAddExpenseClick}
            onSettle={onSettleClick}
          />
          {addExpenseClicked && (
            <AddExpense onExpenseSubmit={onExpenseSubmit} users={users} />
          )}
          {settleClicked && (
            <SettleExpense
              transactions={userTransactions}
              onSettlement={onSettlement}
            />
          )}
          {accumulatedValue && (
            <div className={styles.balanceWrapper}>
              <Balance
                title="total balance"
                value={accumulatedValue.total}
                type="total"
              />
              <Balance
                title="you owe"
                value={accumulatedValue.borrow}
                type="borrow"
              />
              <Balance
                title="you are owed"
                value={accumulatedValue.debt}
                type="debt"
              />
            </div>
          )}
          <div className={styles.transactionSectionWrapper}>
            <TransactionList
              transactions={userTransactions.filter(
                (trans) => trans.type === 'debt'
              )}
              isLoading={isLoading}
              type="debt"
            />
            <TransactionList
              transactions={userTransactions.filter(
                (trans) => trans.type === 'borrow'
              )}
              isLoading={isLoading}
              type="borrow"
            />
          </div>
        </Layout>
      </header>
    </div>
  );
}

export default Dashboard;
