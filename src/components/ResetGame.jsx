import React,{useContext} from 'react'
import { AppContext } from '../context';
import '../styles/ResetGame.css';

export default function ResetGame(){
  const appCtx = useContext(AppContext);

  return (
    <div className="btn-reset-game">
      <input role="button" type='submit' className="btn btn-outline-primary btn-sm" value="Start new challenge!" onClick={()=>appCtx.setDifficultyLevel(appCtx.difficultyLevel)}></input>
    </div>
  );
}