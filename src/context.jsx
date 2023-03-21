import { createContext } from 'react';


export const AppContext = createContext({
  difficultyLevel: '',
  setDifficultyLevel: () => {},
  recentWord:'',
  setRecentWord:()=>{},
  attemptedWords:[], 
  setAttemptedWords:()=>{},answerKey:'',setAnswer:()=>{}
});

export const LogicContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  removeAllItems: () => {},
  attemptedWords: "",
  setAttemptedWords: ()=>{},
  answerKey:"",
  setAnswer: ()=>{}
});