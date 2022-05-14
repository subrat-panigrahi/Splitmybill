import './HeaderButtons.css';
import Button from '../Button';

export default function HeaderButtons({onAddExpense, onSettle}) {
  console.log(onAddExpense)
    return (<div className='headerButtonContainer'>
    <Button  onClickHandler={onAddExpense} text='Add expense' />
    <Button  onClickHandler={onSettle} text='Settle' />
    </div>)
}