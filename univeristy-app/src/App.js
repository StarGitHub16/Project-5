import logo from './logo.svg';
import React, { useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'


function Navbar() {
  return (
    <div id="navbar">
      <div id="logo">UniveristyMingle</div>
      <div>Welcome User</div>
      <NavLink to={'/'} className="categories">Home</NavLink>
      <NavLink to={'/class'} className="categories">Category</NavLink>
      <NavLink to={'/'} className="categories">Category</NavLink>
      <NavLink to={'/'} className="categories">Category</NavLink>
      <NavLink to={'/'} className="categories">Category</NavLink>
      <NavLink to={'/'} className="categories">Category</NavLink>
    </div>
    
  )
}

//The Homepage containing some about info and how to navigate.
function Homepage() {
  return(
  <div>
    <h1>Welcome to University Mingle!</h1>
    <br />
    <h2>Here you can chat and ask questions with other students!</h2>
  </div>
  );
}

//Function pertaining to user submitting a new response.
function NewQuestionScreen() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

    return(
      <div>
        <h1>{message}</h1>
        <form>
           <legend>Please enter your question below:</legend>
           <br />
           <input name="Question" type="text"/>
           <br />
          
           <input type="submit" value="Submit Question" class="button" />
        </form>
      </div>
    )
}




function App() {

  //Communicating with the backend
  

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/class" element= {<NewQuestionScreen />} />
        <Route path="/" element= {<Homepage />} />       
      </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
