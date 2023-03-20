import logo from './logo.svg';
import React, { useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios'
import {BrowserRouter, Routes, Route, NavLink, useNavigate, useParams} from 'react-router-dom'


function Navbar() {

    const signOut = () => {
        alert("User signed out!")
    }

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
      <NavLink to={'/login'} className="categories" onClick={signOut}>SignOut</NavLink>
    </div>

    <div id="logo">
      <div>UniveristySocial</div>
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
    <h1>Register Here:</h1>
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
        <br />
        <NavLink to ='/login'>Login Here</NavLink>
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
        <br />
        <NavLink to ='/register'> Register Here</NavLink>
    </form>

    <h1>{loginStatus}</h1>
  </div>
  )
}


//The Homepage containing some about info and how to navigate.
function Homepage() {

      const navigate = useNavigate();

      useEffect(() => {
      const checkUser = () => {
          if (!localStorage.getItem("_id")) {
              navigate("/");
          } else {
            fetch("http://localhost:8000/api/all/threads")
            .then((res) => res.json())
            .then((data) => setThreadList(data.threads))
            .catch((err) => console.error(err));
          }
      };
      checkUser();
  }, [navigate]);

  const [threadList, setThreadList] = useState([]);

  const createThread = () => {
    fetch("http://localhost:8000/api/create/thread", {
        method: "POST",
        body: JSON.stringify({
            thread,
            userId: localStorage.getItem("_id"),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            setThreadList(data.threads);
        })
        .catch((err) => console.error(err));
};

      const [thread, setThread] = useState("");

      const handleSubmit = (e) => {
        e.preventDefault();
        createThread();
        setThread("");
      };
      return(
        <div>
          <Navbar />
          <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
            </main>

            <div className='thread__container'>
                {threadList.map((thread) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        </div>
                ))}
            </div>

        </div>
        );
}

function Replies() {

  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
      const fetchReplies = () => {
          fetch("http://localhost:8000/api/thread/replies", {
              method: "POST",
              body: JSON.stringify({
                  id,
              }),
              headers: {
                  "Content-Type": "application/json",
              },
          })
              .then((res) => res.json())
              .then((data) => {
                  setReplyList(data.replies);
                  setTitle(data.title);
              })
              .catch((err) => console.error(err));
      };
      fetchReplies();
  }, [id]);

  const addReply = () => {
    fetch("http://localhost:4000/api/create/reply", {
        method: "POST",
        body: JSON.stringify({
            id,
            userId: localStorage.getItem("_id"),
            reply,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            navigate("/dashboard");
        })
        .catch((err) => console.error(err));
};

  //This function when triggered when we add a new reply
  const handleSubmitReply = (e) => {
      e.preventDefault();
      addReply();
      setReply("");
  };

  

    return (
      <main className='replies'>
      <h1 className='repliesTitle'>{title}</h1>

      <form className='modal__content' onSubmit={handleSubmitReply}>
          <label htmlFor='reply'>Reply to the thread</label>
          <textarea
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              type='text'
              name='reply'
              className='modalInput'
          />

          <button className='modalBtn'>SEND</button>
      </form>

      <div className='thread__container'>
          {replyList.map((reply) => (
              <div className='thread__item'>
                  <p>{reply.text}</p>
                  <div className='react__container'>
                      <p style={{ opacity: "0.5" }}>by {reply.name}</p>
                  </div>
              </div>
          ))}
      </div>
  </main>
    )
};


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
      <Routes>
        <Route path="/" element= {<Login />} />     
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Homepage />} />
        <Route path="/:id/replies" element= {<Replies />} />  
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
