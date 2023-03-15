import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'


function Navbar() {
  return (
    <div id="navbar">
      <div id="logo">UniveristyMingle</div>
      <div>Welcome User</div>
      <NavLink to={'/'} className="categories">Home</NavLink>
      <NavLink to={'/'} className="categories">Category</NavLink>
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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Homepage />} />
      </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
