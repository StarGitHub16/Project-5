import logo from './logo.svg';
import React, { useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios'
import {BrowserRouter, Routes, Route, NavLink, Navigate} from 'react-router-dom'


function Navbar() {

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
      <NavLink to={'/login'} className="categories">Logout</NavLink>
    </div>

    <div id="logo">
      <div>UniveristyMingle</div>
      <div>Welcome User</div>
    </div>
    
    </div>
  )
}



//Info regarding the SignUp page.
function Register () {

  const [usernameReg, setUsernameReg] = useState('')

  const [passwordReg, setPasswordReg] = useState('')

  Axios.defaults.withCredentials = true; 

  const register = () => {
    Axios.post('http://localhost:8000/register', 
    {username: usernameReg, password: passwordReg
    }).then((response) => {
      console.log(response);
    })
  }

  return(
  <div>
    <h1>SignUp Here:</h1>
    <form>
        <label>Username: </label>
        <input name="Username" onChange={(e) =>{setUsernameReg(e.target.value)}} type="text" required="required" />
        <br />
        <br />
        <label>Password: </label>
        <input name="Password" onChange={(e) =>{setPasswordReg(e.target.value)}} type="password" required="required" />
        <br />
        <br />
        <input type="submit" onClick={register} value="Register" className="button" />
    </form>
  </div>
  )
}

//Info regarding the login page.
function Login() {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] =useState('');

  const login = () => {
    Axios.post('http://localhost:8000/login', 
    {username: username, password: password
    }).then((response) => {

      if(response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
      console.log(response);
    })
  }

  useEffect ( () => {
    Axios.get("http://localhost:8000/login").then((response) => {
      if(response.data.loggedIn === true)
      setLoginStatus(response.data.user[0].username);
    })
  }, [])

  return(
  <div>
    <h1>Login Here:</h1>
    <form>
        <label>Username: </label>
        <input name="Username" onChange={(e) =>{setUsername(e.target.value)}} type="text" required="required" />
        <br />
        <br />
        <label>Password: </label>
        <input name="Password" onChange={(e) =>{setPassword(e.target.value)}} type="password" required="required" />
        <br />
        <br />
        <input type="submit" onClick={login} value="Login" className="button" />
    </form>

    <h1>{loginStatus}</h1>
  </div>
  )
}


//The Homepage containing some about info and how to navigate.
function Homepage() {

  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
  const loggedInUser = localStorage.getItem("authenticated");
  if (loggedInUser) {
  setauthenticated(loggedInUser);
  }
  }, []);
  
  if (!authenticated) {
    return <Navigate replace to ="/login" />;
  } else {
      return(
        <div>
          <h1>Welcome to University Mingle!</h1>
          <br />
          <h2>Here you can chat and ask questions with other students!</h2>
        </div>
        );
}
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
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/class" element= {<NewQuestionScreen />} />
        <Route path="/" element= {<Homepage />} />       
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
