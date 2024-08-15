import React from 'react'
import logo from './logo.jpg'


export default function Home() {
  return (
    <center>
    <div className="container">
        <img src={logo}/>
        <h2>Welcome to Kitchen Compass</h2>
        <p>Discover recipes based on ingredients</p>
        <a href="/login"><button className="btn btn-secondary">Login</button></a>
    </div>
    </center>
  )
}
