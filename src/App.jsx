import './App.css'
import './styles/Row.css'
import './styles/Grid.css'
import './styles/Prompt.css'
import WordleEvent from './components/Wordle';
import './styles/Wordle.css'
import {Route, Routes} from "react-router-dom"
import Rules from './components/Rules';
import './styles/Navbar.css'
import Home from './Home';
import './styles/Home.css';
import Navbar from './components/Navbar';
import React from 'react'


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/rules" element={<Rules/>}></Route>
        <Route path="/game/:difficultyLevel" element={<WordleEvent></WordleEvent>}></Route>
      </Routes>
    </div>
  )
}

export default App
