import style  from './Button.module.css';

export default function Button({text,onClickHandler,type}){
    return <button className={style.buttonWrapper} onClick={()=>onClickHandler()}>{text}</button>
}