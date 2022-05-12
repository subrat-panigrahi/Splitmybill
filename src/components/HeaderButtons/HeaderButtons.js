import './HeaderButtons.css';
import Button from '../Button';

export default function HeaderButtons() {
    return (<div className='headerButtonContainer'>
    <Button text='Add expense' />
    <Button text='Settle' />
  </div>);
}