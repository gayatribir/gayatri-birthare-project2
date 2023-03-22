import React from 'react'
import { AppContext } from '../context';
import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import AlertBox from './AlertBox';

export default function Prompt({letter}){
  const appCtx = useContext(AppContext);
  const {dispatch} = appCtx;
  const [promptWord, setPromptWord] = useState("")

  const handleOnChange = (event)=> {
    setPromptWord(event.target.value.trim().toUpperCase());
  }
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      if(promptWord.length != letter){toast.error("Please enter "+letter+" letter word!");return;}
      dispatch({type:"ATTEMPT", payload: promptWord});
    }
  }

  return (
   <div>
     <input role="textbox" type='text' className="user-prompt-input" onChange={handleOnChange} onKeyDown={handleEnter} value={promptWord}/>
      <ToastContainer position="top-right" autoClose={2000}/>
      
   </div>
  );
}