import { useEffect, useState } from "react"
import { AppContext } from "./context"




const AppProvider = (props) => {
  const[difficultyLevel, setDifficultyLevel] = useState("normal");
  const [recentWord, setRecentWord] = useState("");
  const [attemptedWords, setAttemptedWords] = useState([])
  const [answerKey, setAnswer] = useState("")

  
  return (
      <AppContext.Provider value = {{difficultyLevel, setDifficultyLevel, recentWord, setRecentWord, attemptedWords, setAttemptedWords,answerKey,setAnswer}}>
          {props.children}
      </AppContext.Provider>
  )
}

export default AppProvider;