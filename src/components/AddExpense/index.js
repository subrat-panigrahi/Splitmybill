import { users } from '../../mock';
import { useState } from 'react';
import { postData } from '../../db/DbUtils';

export default function AddExpense({}) {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);

  const onExpenseSubmit = (e) => {
    setError('');
    e.preventDefault();
    console.log('e is', e.target);
    if(selectedUsers.length === 0){
        setError('please add users involved in this transaction');
    }
    else {
        const timeStamp = Date.now();
        const amountPerPesrson = Number(amount)/selectedUsers.length;
        let currentUser = JSON.parse(localStorage.getItem('user'));
        for(let user of selectedUsers){
            const object = {user1:currentUser.id , transactionType: transactionType, reason : reason, date: date, user2: user, transactionId: `${reason}${timeStamp}`, status:0, amount: amountPerPesrson};
            postData('transaction123',object);
        }
    }
  };
  const onUserSelection = (e) => {
    console.log(e.target.value);
    if(e.target.checked){
        setError('');
    }
      let newSelectedUsers = [...selectedUsers];
      if(newSelectedUsers.indexOf(e.target.value) === -1){
        newSelectedUsers.push(e.target.value);
      }
      else {
        newSelectedUsers.splice(newSelectedUsers.indexOf(e.target.value),1);
      }
      setSelectedUsers(newSelectedUsers);
  };

  const onReasonChange = (reason) => {
    console.log(reason);
    setReason(reason);
  };

  const onDateChange = (date) => {
    console.log(date);
    setDate(date);
  };

  const onAmountChange = (amount) => {
      setAmount(amount);
  }

  const transactionTypeChange = (transactionType) => {
    setTransactionType(transactionType);
  };

  return (
    <div>
      <form onSubmit={onExpenseSubmit}>
        <div>Reason</div>
        <input
          type="text"
          value={reason}
          required
          onChange={(e) => {
            onReasonChange(e.target.value);
          }}
        ></input>
        <div>Enter date</div>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => {
            onDateChange(e.target.value);
          }}
        ></input>
        <div>Enter Amount</div>

        <input type='number' min={0} required onChange={(e)=>onAmountChange(e.target.value)}></input>
        <div> Select participants </div>
        {users.map((user) => (
          <label>
            <input
              type="checkbox"
              value={user.id}
              name='userList'
              onChange={(e) => onUserSelection(e)}
            />
            {user.name}
          </label>
        ))}
        <div>transaction type</div>
        {
          <div>
            <input
              type="radio"
              value="debt"
              name="transactionType"
              required
              onChange={(e) => {
                transactionTypeChange(e.target.value);
              }}
            />{' '}
            Debted
            <input
              type="radio"
              value="borrow"
              required
              name="transactionType"
              onChange={(e) => {
                transactionTypeChange(e.target.value);
              }}
            />{' '}
            Borrowed
          </div>
        }
        <button type="submit">Add expense</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
