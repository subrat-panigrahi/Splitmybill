import './Dashboard.css';
import HeaderButton from '../HeaderButtons';
import Layout from '../Layout';
import Balance from '../Balance';
import TransactionList from '../Transactionlist/Transactionlist';
import { useEffect, useState } from 'react';
import { getData } from '../../db/DbUtils';
import AddExpense from '../AddExpense';

const transactions = [
  { name: 'Hari', amount: 50, type: 'debt' },
  { name: 'Gopal', amount: 100, type: 'borrow' },
  { name: 'Steve', amount: 1500, type: 'debt' },
];

function Dashboard() {
  const [addExpenseClicked, setAddExpenseClicked] = useState(false);
  const [settleClicked, setSettleClicked] = useState(false);
 //  const [transactionList, setTransactionList] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [accumulatedValue, setAccumulatedValue] = useState({borrow:0, debt:0, total:0});
  const calculateTotalValues = (trx) => {
    const output = trx.reduce((acc, tx)=>{
      if(tx.type === 'debt'){
          acc.total += tx.amount;
          acc.debt+= tx.amount;
      }
      if(tx.type === 'borrow'){
        acc.total -= tx.amount;
        acc.borrow+= tx.amount;
      }
      return acc;
    },{debt:0,borrow:0,total:0});
    setAccumulatedValue(output);
  }

  const getUserName = (userArray,id) => {
     const user = userArray.filter((user)=>{ return user.id.toString()=== id.toString()});
     return user[0].name;
  }

  useEffect(() => {
    async function getTransactions() {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const transactions = await getData('transaction123');
      const users = await getData('users');
      const userTransactions = transactions.filter(
          (trans) =>
            trans.user1.toString() === currentUser.id.toString() ||
            trans.user2.toString() === currentUser.id.toString()
        ).map((currentTransaction) => {
          return {
            amount: currentTransaction.amount,
            type: currentTransaction.transactionType,
            name: getUserName(users,currentTransaction.user2),
            userId: currentTransaction.user2
          };
        })
        userTransactions.reduce((acc,utx)=>{ return acc;},[]);
      calculateTotalValues(userTransactions);
      setUserTransactions(userTransactions);
    }
    getTransactions();
  }, []);

  const onAddExpenseClick = () => {
    setAddExpenseClicked(true);
  };
  const onSettleClick = () => {
    setSettleClicked(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <HeaderButton
            onAddExpense={onAddExpenseClick}
            onSettle={onSettleClick}
          />
          {addExpenseClicked && <AddExpense />}
          {accumulatedValue && <div style={{ display: 'flex' }}>
            <Balance title="total balance" value={accumulatedValue.total} type="total" />
            <Balance title="you owe" value={accumulatedValue.borrow} type="borrow" />
            <Balance title="you are owed" value={accumulatedValue.debt} type="debt" />
          </div>
}
          <TransactionList transactions={userTransactions} />
        </Layout>
      </header>
    </div>
  );
}

export default Dashboard;
