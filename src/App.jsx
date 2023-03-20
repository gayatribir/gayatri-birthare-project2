import './App.css'
import './styles/WordleRow.css'
import './styles/Grid.css'
import WordleEvent from './components/WordleEvent';
import './styles/WordleEvent.css'
import {Route, Routes, useNavigate} from "react-router-dom"
import Rules from './components/Rules';
import './styles/Navbar.css'
import Home from './Home';
import './styles/Home.css';
import Navbar from './components/Navbar';
import { AppContext } from './context';
import React, {useContext } from 'react'
import AppProvider from './AppProvider';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar></Navbar>
      <AppContext.Provider value={{difficultyLevel:"", setDifficultyLevel: (difficultyLevel) => navigate("/game/"+difficultyLevel)}}>
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
