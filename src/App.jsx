import React, { useState, useEffect } from 'react'
import './App.css'
import data from './data/secretKey.json';
import './styles/WordleRow.css'
import './styles/Grid.css'
import WordleEvent from './WordleEvent';
import './styles/WordleEvent.css'
import resetLogo from './images/icons8-restart-48.png'
import {Route, Routes} from "react-router-dom"
import Rules from './Rules';
import Navbar from './Navbar';
import './styles/Navbar.css'
import Home from './Home';


function App() {
  const [answerKey, setAnswerKey] = useState(null)
  const tries = 6
  const letter = 6

  const getAnswerKey=()=>{
    setAnswerKey(data.keys[Math.floor(Math.random() * data.keys.length)].toUpperCase());
  }
  useEffect(()=>{getAnswerKey()},[setAnswerKey])

  return (
    <div className="App">
    {/* <header className="title-header">
        <div><span className='rainbow-lr'>Wordle</span></div>
        
      </header>
      <div className="answer-div">{answerKey}</div> */}
      <Navbar></Navbar>
      <div className="answer-div">{answerKey}</div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/rules" element={<Rules/>}></Route>
        <Route path="/wordleEvent" element={<WordleEvent answerKey={answerKey} tries={tries} letter={letter}/>}></Route>
      </Routes>
    </div>
  )
}

export default App
