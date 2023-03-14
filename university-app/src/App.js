import logo from './logo.svg';
import './App.css';



function Navbar() {
  return (
    <div id="navbar">
      <div id="logo">UniveristyMingle</div>
      <div>Welcome User</div>
      <div className="categories">Category 1</div>
      <div className="categories">Category 2</div>
    </div>
    
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
