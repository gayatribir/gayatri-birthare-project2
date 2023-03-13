import { useState, useEffect } from 'react'
import './App.css'
import data from './data/secretKey.json';
import './styles/WordleRow.css'
import './styles/Grid.css'
import WordleEvent from './WordleEvent';
import './styles/WordleEvent.css'
import resetLogo from './images/icons8-restart-48.png'


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
     <header className="title-header">
        <div><span className='rainbow-lr'>Wordle</span></div>
        
      </header>
      <div className="answer-div">{answerKey}</div>
      <WordleEvent answerKey={answerKey} tries={tries} letter={letter} />
      
    </div>
  )
}

export default App
