import React, { useState } from "react";
import { useEffect } from "react";
import Grid from './Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import sixLetterWords from '../data/secretKey.json'
import sevenLetterWords from '../data/sevenLetterKeys.json';
import ResetGame from "./ResetGame";
import Prompt from "./Prompt";

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

  const [answerKey, setAnswer] = useState(getRandWordFromCatlog(isHard))
  const [attemptedWords, setAttemptedWords] = useState([])
  const [recentWord, setRecentWord] = useState("")

  const displayTooShortMessage = () =>{
    toast.error("Word is too small!"); // new line
  };

  const handleKeyDown = (event)=> {
    if(attemptedWords.indexOf(answerKey)>=0) return;

    if(event.keyCode == 13){//Enter Pressed
      if(recentWord.length < answerKey.length){
        console.log(recentWord.length, answerKey.length);
        displayTooShortMessage(); return;
      }
      
      setAttemptedWords([...attemptedWords, recentWord]);
      setRecentWord("");
    }
    else if(String.fromCharCode(event.keyCode).match(/(\w|\s)/g)){//alphabet pressed
      if(recentWord.length < letter){setRecentWord(recentWord + String.fromCharCode(event.keyCode).toUpperCase());}
      else{setRecentWord(String.fromCharCode(event.keyCode).toUpperCase());}
    } else if(event.key === "Backspace" || event.key === "Delete"){//backspace pressed
      setRecentWord(recentWord.slice(0,-1));
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
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
      <ToastContainer position="top-right" autoClose={2000}/>
      <Prompt></Prompt>
      <ResetGame difficultyLevel={difficultyLevel} attemptedWords={attemptedWords}></ResetGame>
      <div>{answerKey}</div>
    </div>
  );
}