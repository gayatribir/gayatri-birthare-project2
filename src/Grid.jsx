import React from "react";
import WordleRow from "./WordleRow";

export default function Grid({attemptedWords, letter, tries, recentWord, color}){
  const emptyWord = [...Array(letter).keys()].map(i => " ").join('');
  const recentWordProcessed = [...Array(letter).keys()].map(i => recentWord[i]||' ').join('');
  const colorSetProcessed = [...Array(letter).keys()].map(i => color[i]||'0').join('');
  const emptyColor = [...Array(letter).keys()].map(i => " ").join('');

  return(   
    <div className="wordle-body-div">
        <div className="wordle-grid-div">
          { [...Array(tries).keys()]
          // .map(i => attemptedWords.length > i ? [attemptedWords[i], color[i]]: [attemptedWords.length==i?recentWordProcessed : emptyWord, colorSetProcessed])
          .map(i => attemptedWords.length > i ? [attemptedWords[i], color[i]]: [attemptedWords.length==i?recentWordProcessed : emptyWord, emptyColor])
          // .map(p => {console.log(p); return p})
          // .map((p, idx) => <WordleRow key={idx} word={p[0]}  attempted={p[1]} size={letter}/>)}
          .map((p, idx) => <WordleRow key={idx} word={p[0]} color={p[1]}/>)}
        </div>
    </div>
  );
}