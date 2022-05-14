import './Dashboard.css';
import HeaderButton from '../HeaderButtons/HeaderButtons';
import Layout from '../Layout';
import Balance from '../Balance';
import TransactionList from '../Transactionlist/Transactionlist';
import { useEffect } from 'react';
import {getData} from '../../db/DbUtils';

const transactions = [{name: 'Hari', amount: 50, type: 'receive'},{name: 'Gopal', amount: 100, type: 'pay'},{name: 'Steve', amount: 1500, type: 'receive'}];

function Dashboard() {
    useEffect(()=>{getData('users')},[]);
  return (
    <div className="App">
      <header className="App-header">
      <Layout>
        <HeaderButton />
        <div style={{'display':'flex'}}>
        <Balance title='total balance' value={100} type='total'/>
        <Balance title='you owe' value={200} type='pay'/>
        <Balance title='you are owed' value={300001} type='receive'/>
        </div>
        <TransactionList transactions={transactions}/>
      </Layout>
      </header>
    </div>
  );
}

export default Dashboard;
