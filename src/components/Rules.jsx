export default function Rules(){
  return (
    <div className="div-rules">
      <h1 className="rules-title">
        Rules
        </h1>
        <div>
          <ul>
            <li>
              A player has to select the difficulty level as normal or hard. 
            </li>
            <li>
            In normal mode, a player has to guess a word of six letters in six tries, whereas in hard mode, player will guess a word of seven length in only five tries.
            </li>
            <li>
            Every word should be entered in input text box and hit enter to know the result. 
            </li>
            <li>
            Every entered word should be in the valid english word.
            </li>
            <li>
            If a word is correct, the cell of the letter would turn green.
            </li>
            <li>
            If a letter is correct but in wrong place, the cell would turn yellow.
            </li>
            <li>
            An incorrect letter turns gray
            </li>
          </ul>
        </div>
     
    </div>
  );
}