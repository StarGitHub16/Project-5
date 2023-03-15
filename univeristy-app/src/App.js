import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'


function Navbar() {
  return (
    <div id="navbar">
      <div id="logo">UniveristyMingle</div>
      <div>Welcome User</div>
      <NavLink to={'/'} className="categories" >Category</NavLink>
      <div className="categories">Category</div>
      <div className="categories">Category</div>
      <div className="categories">Category</div>
      <div className="categories">Category</div>
      <div className="categories">Category</div>
    </div>
    
  )
}

//The Homepage containing some about info and how to navigate.
function homePage() {
  <div>
    <h1>Welcome to University Mingle!</h1>
    <br />
    <h2>Here you can ask questions or find existing questions.
        Related to Unviersity topics that students have experienced in!
    </h2>
  </div>
}

function Main() {
  return(
    <BrowserRouter>
      <Routes>
        
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
