import React,{useContext} from 'react'
import { AppContext } from '../context';
import '../styles/ResetGame.css';

export default function ResetGame(){
  const appCtx = useContext(AppContext);
  const {difficultyLevel, setDifficultyLevel, recentWord, setRecentWord} = appCtx;
  const [attemptedWords, setAttemptedWords] = [appCtx.attemptedWords,appCtx.setAttemptedWords]
  const [answerKey, setAnswer] = [appCtx.answerKey, appCtx.setAnswer]

  const handleResetGame = ()=>{
    setAttemptedWords([]);
  }
  
  return (
    <div className="btn-reset-game">
      <input role="button" type='submit' className="btn btn-outline-primary btn-sm" value="Start new challenge!" onClick={handleResetGame}></input>
    </div>
  );
}