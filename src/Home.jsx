import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState} from 'react'
import {useNavigate} from "react-router-dom"


export default function Home(){
  const [level, setLevel] = useState("normal");
  const navigate = useNavigate();

  const onLevelChange = (event) =>{
    setLevel(event.target.value);
  }

  const onLevelSubmit = () =>{
    navigate("/game/"+level);
  }


  return (
    <div className="home-margin">
      <div>
        <h1>Welcome to Wordle!</h1>
        <p>Please click Rules link to know the rules. Enjoy!
          <label className='lbl-level'>Please select the difficulty level to play. &nbsp;
          <select className='ddl-level btn-primary' onChange={onLevelChange}> 
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
            </select>&nbsp;&nbsp;
            <input role="button" tabIndex="0" type="submit" className="btn btn-primary btn-sm" value="Play!" onClick={onLevelSubmit}></input>
          </label>
        </p>
      </div>
      
    </div>
  );
}