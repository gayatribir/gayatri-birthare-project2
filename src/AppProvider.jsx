import { useEffect, useState } from "react"
import { AppContext } from "./context"

const AppProvider = (props) => {
  const[difficultyLevel, setDifficultyLevel] = useState("normal");

  // setDifficultyLevel("HARD");
  return (
      <AppContext.Provider value = {{difficultyLevel, setDifficultyLevel}}>
          {props.children}
      </AppContext.Provider>
  )
}

export default AppProvider;