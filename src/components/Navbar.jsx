import {Link, useMatch, useResolvedPath} from "react-router-dom"
import React, { useEffect, useState } from 'react'

function Navbar({gamePath}){
  console.log("In NavBar, gamePath=",gamePath);
  return (
    <nav className="nav">
      <Link to="/" className="site-title">Wordle Game</Link>
      <ul>
        <CustomLink to="/rules">Rules</CustomLink>
        <CustomLink to={gamePath} >Play Wordle</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end:true})
  return (
    <li className="">
      <Link to={to} {...props}>{children}</Link>
    </li>
  )
}
export default Navbar