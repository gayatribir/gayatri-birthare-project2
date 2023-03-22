import React,{useContext} from 'react'
import { AppContext } from '../context';
import '../styles/ResetGame.css';


export default function ResetGame(){
  const {state, dispatch} = useContext(AppContext);

  const handleResetGame = ()=>{
    dispatch({type: "RESET"});
  }
  
  return (
    <div className="btn-reset-game">
      <input role="button" type='submit' className="btn btn-primary btn-sm" value="Start new challenge!" onClick={handleResetGame}></input>
    </div>
  );
}