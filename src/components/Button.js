import  './Button.css';

export default function Button({text,onClickHandler,type}){
    return <button className='buttonWrapper' onClick={()=>onClickHandler}>{text}</button>
}