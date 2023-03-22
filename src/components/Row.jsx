import React from "react"

export default function WordleRow({word, color}){

  return (
    <div className="wordle-cols">
      
    {/* <div class="shake"><p>shake</p></div> */}
    
  
      {word.split('').map((i,idx)=><div key={idx} className={
        `wordle-box 
        ${color[idx] == "1" ? 'green bounce' : color[idx] == "2" ? 'yellow shake' : color[idx] == " " ? 'none':'grey'}`}><p className="box-value">{i}</p></div>)}
    </div>   
  );
}
