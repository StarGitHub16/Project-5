import logo from './logo.svg';
import React, { useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios'
import {BrowserRouter, Routes, Route, NavLink, useLocation} from 'react-router-dom'


function Navbar() {

  const location= useLocation()

  return (
    <div>
      <div id="navbar">
      <NavLink to={'/'} className="categories">Home</NavLink>
      <NavLink to={'/'} className="categories">Admissions</NavLink>
      <NavLink to={'/'} className="categories">Athletics and Gym</NavLink>
      <NavLink to={'/class'} className="categories">Classes</NavLink>
      <NavLink to={'/'} className="categories">Clubs</NavLink>
      <NavLink to={'/'} className="categories">Events</NavLink>
      <NavLink to={'/'} className="categories">Housing</NavLink>
    </div>

    <div id="logo">
      <div>UniveristyMingle</div>
      <div>Welcome {location.state.id}</div>
    </div>
    
    </div>
  )
}



//Info regarding the SignUp page.
function SignUp () {

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const register = () => {
    Axios.post('http://localhost8000/register', 
    {username: username, password:password
    }).then((response) => {
      console.log(response);
    })
  }

  return(
  <div>
    <h1>SignUp Here:</h1>
    <form action="POST">
        <label>Username: </label>
        <input name="Username" onChange={(e) =>{setUsername(e.target.value)}} type="text" required="required" />
        <br />
        <br />
        <label>Password: </label>
        <input name="Password" onChange={(e) =>{setPassword(e.target.value)}} type="password" required="required" />
        <br />
        <br />
        <input type="submit" onClick={register} value="Register" class="button" />
    </form>
  </div>
  )
}

function Login() {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] =useState('');

  const login = () => {
    Axios.post('http://localhost8000/login', 
    {username: username, password:password
    }).then((response) => {

      if(response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
      console.log(response);
    })
  }

  return(
  <div>
    <h1>Login Here:</h1>
    <form action="POST">
        <label>Username: </label>
        <input name="Username" onChange={(e) =>{setUsername(e.target.value)}} type="text" required="required" />
        <br />
        <br />
        <label>Password: </label>
        <input name="Password" onChange={(e) =>{setPassword(e.target.value)}} type="password" required="required" />
        <br />
        <br />
        <input type="submit" onClick={login} value="Login" class="button" />
    </form>

    <h1>Congrats {loginStatus}</h1>
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
