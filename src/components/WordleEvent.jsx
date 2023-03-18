import React, { useState } from "react";
import { useEffect } from "react";
import Grid from './Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import sixLetterWords from '../data/secretKey.json'
import sevenLetterWords from '../data/sevenLetterKeys.json';

export default function WordleEvent(){
  const [letter, setLetter] = useState(0)
  const [tries, setTries] = useState(0)
  const [attemptedWords, setAttemptedWords] = useState([])
  const [triesWords, setTriesWords] = useState(new Array(tries).fill(""))
  const [recentWord, setRecentWord] = useState("")
  const [color, setColor] = useState([])
  const { difficultyLevel } = useParams();
  const navigate = useNavigate();
  const [answerKey, setAnswerKey] = useState(null)

  const displayTooShortMessage = () =>{
    toast.error("Word is too small!"); // new line
  };

  const freqMap = (answerKey) =>{
    let counts = {}
    for (const num of answerKey) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  };

  function checkLettersFromAnswer(){
    const answerKeyMap = freqMap(answerKey);
    console.log(answerKeyMap);

    const colorSet = [...Array(letter).fill(3)]//All are Grey at first

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

    setColor([...color, colorSet.join('')]);
  }

  const handleKeyDown = (event)=>{
    console.log(event.key)
    if(event.keyCode == 13){//Enter Pressed
      if(recentWord.length < answerKey.length){
        console.log(recentWord.length, answerKey.length);
        displayTooShortMessage(); return;
      }
      
      checkLettersFromAnswer();
      setAttemptedWords([...attemptedWords, recentWord]);
      setTriesWords((triesWords) => triesWords.filter((_, index) => index !== triesWords.length-1));
      if(recentWord == answerKey){
        if (window.confirm("Congratulations! Would you like to try again?")) {
          setAttemptedWords([]);
          setColor([]);
        }
      }
      setRecentWord("");
      
      console.log("Word added", recentWord);
    }
    else if(String.fromCharCode(event.keyCode).match(/(\w|\s)/g)){//alphabet pressed
      if(recentWord.length < letter){setRecentWord(recentWord + String.fromCharCode(event.keyCode).toUpperCase());}
      else{setRecentWord(String.fromCharCode(event.keyCode).toUpperCase());}
    } else if(event.key === "Backspace" || event.key === "Delete"){//backspace pressed
      setRecentWord(recentWord.slice(0,-1));
    }
  }
  function setUpGame() {
    if(difficultyLevel == "" || answerKey != null){return;}
    localStorage.setItem('difficultyLevel',difficultyLevel);
    if(difficultyLevel.toUpperCase() == 'HARD'){
      setAnswerKey(sevenLetterWords.keys[Math.floor(Math.random() * sevenLetterWords.keys.length)].toUpperCase());
      setLetter(7); setTries(5);}
    else{setAnswerKey(sixLetterWords.keys[Math.floor(Math.random() * sixLetterWords.keys.length)].toUpperCase());
      setLetter(6); setTries(6);}
    console.log("printing number of letters ",letter);
  }

  function checkIfWin(){
    if(recentWord == answerKey){
      if (window.confirm("Congratulations! Would you like to try again?")) {
        setAttemptedWords([]);
        setColor([]);
      }
    }
  }
  useEffect(() => {
    setUpGame();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return(
    <div >
      {/* <div className="event">keydown event listener added. Answer key is {answerKey}</div> */}
      
      <Grid attemptedWords={attemptedWords} letter={letter} tries={tries} recentWord={recentWord} color={color}/>
      {/* {checkIfWin()} */}
      {/* <button className="btn btn-success" onClick={home}>
                Back to Home Page
            </button> */}
      <ToastContainer position="top-right" autoClose={2000}/>
      <div className="answer-div">{answerKey}</div>
    </div>
  );
}