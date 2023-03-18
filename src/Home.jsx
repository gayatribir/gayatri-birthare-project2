import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

export default function Home(){
  const [difficultyLevel, setDifficultyLevel] = useState("normal")
  const navigate = useNavigate();
  
  // const onLevelChange = (event) => {
  //     setDifficultyLevel(event.target.value);
  //   };
  // const handleClick = () => {navigate("/game/"+difficultyLevel);}
  return (
    <div className="home-margin">
      <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Welcome to Wordle!</Card.Title>
        <Card.Text>
        Please click Rules link to know the rules. Enjoy!
        </Card.Text>
         
        <label className='lbl-level'>Please select the difficulty level to play.
        <select className='ddl-level' onChange={(e) => setDifficultyLevel(e.target.value)}> 
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
        <Button as="input" type="submit" value="Play!" onClick={()=> navigate("/game/"+difficultyLevel)} /></label>
      </Card.Body>
    </Card>
    </div>
  );
}