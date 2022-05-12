import './Dashboard.css';
import HeaderButton from '../HeaderButtons/HeaderButtons';
import Layout from '../Layout';
import Balance from '../Balance';
import Transaction from '../Transaction';

function Dashboard() {
  return (
    <div className="App">
      <header className="App-header">
      <Layout>
        <HeaderButton />
        <div style={{'display':'flex'}}>
        <Balance title='total balance' value={100} type='total'/>
        <Balance title='you owe' value={200} type='pay'/>
        <Balance title='you are owed' value={300001} type='receieve'/>
        </div>
        <Transaction name='Hari' amount={100} text='owes you' type='receieve'/>
      </Layout>
      </header>
    </div>
  );
}

export default Dashboard;
