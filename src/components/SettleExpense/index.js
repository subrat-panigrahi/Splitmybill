import styles from './SettleExpense.module.css';
import { updateTransaction } from '../../db/DbUtils';
import {formatNumber} from '../../utils/utils';

export default function SettleExpense({ transactions, onSettlement }) {
  const onSettleClick = async (e) => {
    await updateTransaction(e);
    onSettlement();
  };

  // const currentUser = JSON.parse(localStorage.getItem('user'));
  const debtTransactions = transactions.filter((item) => item.type === 'debt');
  console.log('debt', debtTransactions);

  if (!debtTransactions.length) {
    return <div> you have no settlements pending !</div>;
  }

  return (
    <div className={styles.settleWrapper}>
      <table>
        <tr className={styles.settleRowWrapper}>
          <td className={styles.rowItem}> user</td>
          <td className={styles.rowItem}> amount</td>
          <td className={styles.rowItem}> reason</td>
          <td className={styles.rowItem}> date</td>
          <td className={styles.rowItem}> action</td>
        </tr>
        <hr/>
        {debtTransactions.map((tr) => (
          <tr className={styles.settleRowWrapper} key={tr.id}>
            <td className={styles.rowItem}>{tr.name}</td>
            <td className={styles.rowItem}> {formatNumber(tr.amount)}</td>
            <td className={styles.rowItem}>{tr.reason}</td>
            <td className={styles.rowItem}>{tr.date}</td>
            <td>
              <button
                onClick={() => {
                  onSettleClick(tr.id);
                }}
              >
                Settle
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
