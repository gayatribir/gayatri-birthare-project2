import React from 'react'
import { AppContext } from '../context';
import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Prompt(){
  const appCtx = useContext(AppContext);
  const {difficultyLevel, setDifficultyLevel, recentWord, setRecentWord} = appCtx;
  const letter = difficultyLevel.toUpperCase()=="HARD" ? 7: 6;
  const [promptWord, setPromptWord] = useState("")

  const handleOnChange = (event)=> {
    // console.log(event.target.value);
    if(event.target.value.match(/(\w|\s)/g)){//alphabet pressed
      setPromptWord(event.target.value.toUpperCase());
      
    } else if(event.key === "Backspace" || event.key === "Delete"){//backspace pressed
      setPromptWord(promptWord.slice(0,-1));
    }
  }
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      if(promptWord.length != letter){toast.error("Please enter "+letter+" letter word!");return;}
      setRecentWord(promptWord);
    }
  }
  useEffect(() => {
      if(recentWord != ""){setPromptWord("");}
    }, );
  return (
   <div>
     <input role="textbox" type='text' className="user-prompt-input" onChange={handleOnChange} onKeyDown={handleEnter} value={promptWord}/>
      <ToastContainer position="top-right" autoClose={2000}/>
   </div>
  );
}