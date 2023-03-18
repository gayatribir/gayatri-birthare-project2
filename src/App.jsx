import './App.css'
import './styles/WordleRow.css'
import './styles/Grid.css'
import WordleEvent from './components/WordleEvent';
import './styles/WordleEvent.css'
import {Route, Routes, useNavigate, Link} from "react-router-dom"
import Rules from './components/Rules';
import './styles/Navbar.css'
import Home from './Home';
import './styles/Home.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar"><a href="/" className='rainbow-lr'>Wordle Game</a></nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/rules" element={<Rules/>}></Route>
        <Route path="/game/:difficultyLevel" element={<WordleEvent></WordleEvent>}></Route>
      </Routes>
    </div>
  )
}

export default App
