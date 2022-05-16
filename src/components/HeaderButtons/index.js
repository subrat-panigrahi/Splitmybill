import style from './HeaderButtons.module.css';
import Button from '../Button';

export default function HeaderButtons({onAddExpense, onSettle}) {
    return (<div className={style.headerButtonContainer}>
    <Button  onClickHandler={onAddExpense} text='Add expense' />
    <Button  onClickHandler={onSettle} text='Settle' />
    </div>)
}