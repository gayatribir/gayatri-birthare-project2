import React, { useReducer } from "react";
import Grid from './Grid';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import ResetGame from "./ResetGame";
import Prompt from "./Prompt";
import { AppContext } from '../context';
import sixLetterWords from '../data/secretKey.json'
import sevenLetterWords from '../data/sevenLetterKeys.json';
import AlertBox from "./AlertBox";

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

  for(let i=0;i<recentWord.length;i++){
    if(answerKey.charAt(i) == recentWord.charAt(i))
    {
      answerKeyMap[answerKey.charAt(i)] = answerKeyMap[answerKey.charAt(i)]-1;
      colorSet[i] = 1;//Green
    }
  }
  
  for(let i=0;i<recentWord.length;i++){
    if(answerKeyMap[recentWord.charAt(i)] > 0 && colorSet[i] != 1)
    {
      answerKeyMap[recentWord.charAt(i)] = answerKeyMap[recentWord.charAt(i)]-1;
      colorSet[i] = 2;//Yellow
      }
  }

  return colorSet.join('');
}


const getInitialState = (isHard) => {
  return { 
    letter : isHard ? 7: 6, 
    tries : isHard ? 5 : 6, 
    attemptedWords:[],
    answerKey: getRandWordFromCatlog(isHard)
  };
}

const saveState = (state, isHard) => {
  try {
    window.localStorage.setItem("wordle." + (isHard ? "hard" : "normal"), JSON.stringify(state));
  } catch(e) {}
}

const reloadState = (isHard) => {
  let prestate;
  try {
    prestate = JSON.parse(window.localStorage.getItem("wordle." + (isHard ? "hard" : "normal")));
  } catch(e) {}

  return prestate || getInitialState(isHard);
}

export default function WordleEvent(){
  const { difficultyLevel } = useParams();
  const isHard = difficultyLevel.toLocaleUpperCase() == "HARD";

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "ATTEMPT":
        return {
          ...state,
          attemptedWords: [...state.attemptedWords, action.payload]
        };
        case "RESET":
          return getInitialState(isHard);
      default:
        state
    }
  }, 
  reloadState(isHard));

  saveState(state, isHard);
  
  const {attemptedWords, answerKey, letter, tries} = state;
  const color = attemptedWords.map(word => calcColor(word, answerKey))

  return(
    <AppContext.Provider value={{dispatch}}>
      <div className="div-wordle">      
        <Grid attemptedWords={attemptedWords} letter={letter} tries={tries} recentWord="" color={color}/>
        {(attemptedWords.indexOf(answerKey)===-1) ? <Prompt key={attemptedWords.length} letter={letter}/>: <AlertBox show={attemptedWords.indexOf(answerKey)>=0}/>}
        <ResetGame></ResetGame>
        {/* <div>{answerKey}</div> */}
      </div>
    </AppContext.Provider>
  );
}