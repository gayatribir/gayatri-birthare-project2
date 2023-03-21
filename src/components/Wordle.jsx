import React, { useState } from "react";
import { useEffect, useContext } from "react";
import Grid from './Grid';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import ResetGame from "./ResetGame";
import Prompt from "./Prompt";
import { AppContext } from '../context';
import sixLetterWords from '../data/secretKey.json'
import sevenLetterWords from '../data/sevenLetterKeys.json';

const getRandWordFromCatlog = (isHard) => isHard 
? sevenLetterWords.keys[Math.floor(Math.random() * sevenLetterWords.keys.length)].toUpperCase() 
: sixLetterWords.keys[Math.floor(Math.random() * sixLetterWords.keys.length)].toUpperCase()

const freqMap = (answerKey) => {
  let counts = {}
  for (const num of answerKey) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return counts;
};

const calcColor = (recentWord, answerKey) => {
  const answerKeyMap = freqMap(answerKey);
  const colorSet = [...Array(recentWord.length).fill(3)]//All are Grey at first
  let allGreen = 0;

  for(let i=0;i<recentWord.length;i++){
    if(answerKey.charAt(i) == recentWord.charAt(i))
    {
      answerKeyMap[answerKey.charAt(i)] = answerKeyMap[answerKey.charAt(i)]-1;
      colorSet[i] = 1;//Green
      allGreen++;
    }
  }
  
  for(let i=0;i<recentWord.length;i++){
    if(answerKeyMap[recentWord.charAt(i)] > 0 && colorSet[i] != 1)
    {
      answerKeyMap[recentWord.charAt(i)] = answerKeyMap[recentWord.charAt(i)]-1;
      colorSet[i] = 2;//Yellow
      }
  }

  // if(allGreen != answerKey.length){setColor([...color, colorSet.join('')]);}
  return colorSet.join('');
}


export default function WordleEvent(){
  const { difficultyLevel } = useParams();
  const isHard = difficultyLevel.toLocaleUpperCase() == "HARD";
  const letter = isHard ? 7: 6;
  const tries = isHard ? 5 : 6;
  const appCtx = useContext(AppContext);

  const [answerKey, setAnswer] = useState(getRandWordFromCatlog(isHard));
  const [attemptedWords, setAttemptedWords] = [appCtx.attemptedWords,appCtx.setAttemptedWords]
  const [recentWord, setRecentWord] = [appCtx.recentWord,appCtx.setRecentWord]

  

  const handleKeyDown = ()=> {
    if(attemptedWords.indexOf(answerKey)>=0) return;
    setAttemptedWords([...attemptedWords, recentWord]);
    setRecentWord("");
  }

  useEffect(() => {
    if(recentWord != ""){handleKeyDown();}
    setTimeout(() => {
      if (attemptedWords.indexOf(answerKey)>=0 && window.confirm("Congratulations! Would you like to try again?")) {
        setAttemptedWords([]);
        setAnswer(getRandWordFromCatlog(isHard));
      }
    }, 50);
  });  

  const color = attemptedWords.map(word => calcColor(word, answerKey))

  return(
    <div className="div-wordle">      
      <Grid attemptedWords={attemptedWords} letter={letter} tries={tries} recentWord={recentWord} color={color}/>
      <Prompt></Prompt>
      <ResetGame></ResetGame>
      <div>{answerKey}</div>
    </div>
  );
}