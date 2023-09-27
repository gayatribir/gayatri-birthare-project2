import React from 'react'
import { AppContext } from '../context';
import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import validSixLetterWords from '../data/validGuessSixLetters.json'
import validSevenLetterWords from '../data/validGuessSixLetters.json';
import sixLetterWords from '../data/secretKey.json'
import sevenLetterWords from '../data/sevenLetterKeys.json';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const isValidSixLetters = (word) => {
  return (
    (sixLetterWords.keys.includes(word) || validSixLetterWords.keys.includes(word))
  )
}
export const isValidSevenLetters = (word) => {
  return (
    (sevenLetterWords.keys.includes(word) || validSevenLetterWords.keys.includes(word))
  )
}

export default function Prompt({letter}){
  const appCtx = useContext(AppContext);
  const {dispatch} = appCtx;
  const [promptWord, setPromptWord] = useState("")

  const showTooltip = props => (
    <Tooltip {...props}>Please enter the word and hit enter to know the result.</Tooltip>
  );

  const handleOnChange = (event)=> {
    setPromptWord(event.target.value.trim().toUpperCase());
  }
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      if(promptWord.length != letter){toast.error("Please enter "+letter+" letter word!");return;}
      if(letter == 6){ 
        if (!isValidSixLetters(promptWord.toLowerCase())) {
          toast.error("Invalid word entered!");return;
        }
      }else{
        if (!isValidSevenLetters(promptWord.toLowerCase())) {
          toast.error("Invalid word entered!");return;
        }
      }
      
      dispatch({type:"ATTEMPT", payload: promptWord});
    }
  }

  return (
   <div>
     <OverlayTrigger placement="top" overlay={showTooltip}>
     <input autoFocus role="textbox" type='text' className="user-prompt-input" onChange={handleOnChange} onKeyDown={handleEnter} value={promptWord}/>
      </OverlayTrigger>
     
      <ToastContainer position="top-right" autoClose={2000}/>
      
   </div>
  );
}