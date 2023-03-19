import './App.css'
import './styles/WordleRow.css'
import './styles/Grid.css'
import WordleEvent from './components/WordleEvent';
import './styles/WordleEvent.css'
import {Route, Routes} from "react-router-dom"
import Rules from './components/Rules';
import './styles/Navbar.css'
import Home from './Home';
import './styles/Home.css';
import Navbar from './components/Navbar';

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
