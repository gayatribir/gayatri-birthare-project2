import './App.css'
import './styles/Row.css'
import './styles/Grid.css'
import './styles/Prompt.css'
import WordleEvent from './components/Wordle';
import './styles/Wordle.css'
import {Route, Routes, useNavigate} from "react-router-dom"
import Rules from './components/Rules';
import './styles/Navbar.css'
import Home from './Home';
import './styles/Home.css';
import Navbar from './components/Navbar';
import { AppContext } from './context';
import React, {useContext, useState } from 'react'


function App() {
  const navigate = useNavigate();
  const appCtx = useContext(AppContext);
  const [recentWord, setRecentWord] = useState("");
  const [attemptedWords, setAttemptedWords] = useState([])
  return (
    <div className="App">
      <Navbar></Navbar>
      <AppContext.Provider 
      value={{difficultyLevel:"", 
      setDifficultyLevel: (difficultyLevel) => navigate("/game/"+difficultyLevel), 
      recentWord, 
      setRecentWord,attemptedWords, setAttemptedWords}}>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/rules" element={<Rules/>}></Route>
        <Route path="/game/:difficultyLevel" element={<WordleEvent></WordleEvent>}></Route>
      </Routes>
      </AppContext.Provider>
    </div>
  )
}

export default App
