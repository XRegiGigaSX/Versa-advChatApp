import './App.css';
import io from "socket.io-client"
import { toast } from 'react-toastify';
import { useState, useEffect } from "react"
import Chats from './components/Chats';
import Login from './components/Login';

const socket = io.connect("https://versa-server.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] });


function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [password, setPassword] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [login, setLogin] = useState(false)
  const [next, setNext] = useState(false)

  function joinRoom() {
    if (username !== "" && room !== "" && password !== "") {
      socket.emit("join_room", room, password)
    }else if(username === ""){
      toast.error("Please set a username first!")
    }else if(room === ""){
      toast.error("Please enter the Room ID!")
    }else if(password === ""){
      toast.error("Please enter the Password!")
    };
  }

  useEffect(() =>{ 
    socket.on("create_room", (msg) => {
      setShowChat(true)
      toast.success(msg)
    })
    socket.on("join_room", (clearance) => {
      if (clearance) {
        setShowChat(true);
        toast.success("Welcome to the party bitch!")
      } else {
        toast.error("Task failed successfully, check your username and password.")
      }
    })
  }, [])

  function createRoom() {
    if (username !== "" && room !== "" && password !== "") {
      socket.emit("create_room", room, password)
    }else if(username === ""){
      toast.error("Please set a username first!")
    }else if(room === ""){
      toast.error("Please set a Room ID!")
    }else if(password === ""){
      toast.error("Please set a Password!")
    };
  }

  function handlePrevious() {
    setNext(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    setLogin(true);
    setNext(true)
  }

  function handleSignup(e) {
    e.preventDefault();
    setLogin(false);
    setNext(true)
  }

  function handleLogout(e){
    e.preventDefault();
    setLogin(false);
    setNext(false);
    setShowChat(false);
  }

  return (
    <div className="text-white background-rot text-center z-10 min-h-screen pt-1 flex justify-center items-center flex-wrap">
      {(!showChat) ?
        <div className="w-10/12 md:w-8/12 lg:w-8/12 h-128 mb-7 md:mb-5">
          <span className="text-8xl text-white title">Versa</span>
          {(!next) ? <div className="flex flex-col md:flex-row flex-wrap justify-center md:w-2/3 mx-auto mt-3">
            <button className="mt-4 block mx-auto rounded-full bg-gradient-to-r from-slate-500 to-slate-700  hover:from-slate-700 hover:to-slate-500 p-3 shadow-lg imp-button" onClick={handleLogin}>Join room</button>
            <button className="mt-4 block mx-auto rounded-full bg-gradient-to-r from-slate-500 to-slate-700  hover:from-slate-700 hover:to-slate-500 p-3 shadow-lg imp-button" onClick={handleSignup}>Create room</button>
          </div> :
            <div>
              <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} room={room} setRoom={setRoom} createRoom={createRoom} joinRoom={joinRoom} handlePrevious={handlePrevious} login={login}/>
            </div>}
        </div> : <Chats
          socket={socket}
          username={username}
          room={room}
          password={password}
          handleLogout={handleLogout}
        />}
    </div>
  );
}

export default App;
