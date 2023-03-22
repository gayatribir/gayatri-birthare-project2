import {Link, useMatch, useResolvedPath} from "react-router-dom"
import React from 'react'

function Navbar({gamePath}){
  // console.log("In NavBar, gamePath=",gamePath);
  return (
    <nav className="nav">
      <Link to="/" className="site-title rainbow-lr" >Wordle Game</Link>
      <ul>
        <CustomLink to="/rules">Rules</CustomLink>
      </ul>
    </nav>
  )
}


function CustomLink({to, children, ...props}){
  // const resolvedPath = useResolvedPath(to)
  return (
    <li className="rules-link">
      <Link to={to} {...props}>{children}</Link>
    </li>
  )
}
export default Navbar