import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState,useContext } from 'react'
import { AppContext } from './context';

export default function Home(){
  const [difficultyLevel, setDifficultyLevel] = useState("normal")
  const appCtx = useContext(AppContext);
  
  const onLevelChange = (event) =>{
    setDifficultyLevel(event.target.value);
  }

  return (
    <div className="home-margin">
      <h1>Welcome to Wordle!</h1>
      <p>Please click Rules link to know the rules. Enjoy!
        <label className='lbl-level'>Please select the difficulty level to play. &nbsp;
        <select className='ddl-level btn-primary' onChange={onLevelChange}> 
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>&nbsp;&nbsp;
          <input role="button" tabIndex="0" type="submit" className="btn btn-outline-primary btn-sm" value="Play!" onClick={()=>appCtx.setDifficultyLevel(difficultyLevel)}></input>
        </label>
      </p>
    </div>
  );
}