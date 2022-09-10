import React, { useEffect, useState } from 'react'
import "../App.css"
import ScrollToBottom from 'react-scroll-to-bottom';
import sendBeept from './sendBeep.mp3'
import fbi from './fbi.mp3'
import sus from './sus.mp3'

export default function Chats({ socket, username, room, password, handleLogout }) {

  const [curMessage, setCurMessage] = useState("")
  const [messageList, setMessageList] = useState([])
  var sendBeep = new Audio(sendBeept)
  var roomID = "[" + [room] + "]";

  var shareDetails = "VERSA : https://versa-chat.netlify.app/ \nRoom ID : " + [room] + "\nPassword : " + [password];

  var logData = {
    room: room,
    author: "chat",
    message: username+" has landed successfully!"
  }

  function shareLink() {
    navigator.clipboard.writeText(shareDetails);
    alert("Copied the text to clipboard: \n" + shareDetails);
  }

  const sendMessage = async () => {
    var minutes = new Date(Date.now()).getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (curMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: curMessage,
        time: new Date(Date.now()).getHours() + ':' + [minutes],
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData])

      sendBeep.play();
      setCurMessage("");
    };
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data])
    })

    socket.on("log", (data) => {
      setMessageList((list) => [...list, data]);
      (new Audio(sus)).play();
    })
  }, [socket])

  useEffect(() => {
    socket.emit("log", logData);
    (new Audio(fbi)).play();
  }, [])

  return (
    <div className="chat-container p-5 pr-2 w-full sm:w-full md:w-3/4 lg:w-1/2 rounded-xl shadow-2xl flex-column justify-center text-center mx-3">
      <div className="flex justify-between">
        <span className="text-white p-3 pr-5 mb-2 md:mb-3 text-lg md:text-2xl">Live Chat {roomID} </span>
        <div className="w-5/12 flex flex-row justify-end">
          <button className="mb-3 mr-3 bg-slate-500 hover:bg-slate-700 rounded-md w-1/3 p-1 h-16 text-xs md:text-md px-1" onClick={shareLink}>Share with friends</button>
          <button className="mb-3 mr-3 bg-slate-500 hover:bg-slate-700 rounded-md w-1/3 p-1 h-16" onClick={handleLogout}>Log out</button>
        </div>
      </div>
      <div className="chat-space flex-col pr-1 pb-2">
        <hr className="sticky top-0 z-10 mb-2"></hr>
        <ScrollToBottom className="message-container">
          {messageList.map((m, i) => {
            return (
              <div key={i} className={username === m.author ? "grid justify-items-end flex-1" : (m.author === "chat" ? "log" : "grid justify-items-start flex-1")}>
                <div className="message-body min-w-[30%] max-w-[60%] break-words text-left bg-black rounded-lg my-1 pt-2 pb-1 pl-3 pr-1 relative" id={ m.author === username ? "you" : "other"}>
                  <p className="message-author text-xs text-white text-left underline">{m.author === "chat" ? "" : m.author}</p>
                  <span className="message-content leading-4 text-left text-s md:text-lg mt-1 mr-4 inline-block">{m.message}</span>
                  <p className="message-time text-xs text-right mt-1">{m.author === "chat" ? "" : m.time}</p>
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
        <hr className="sticky bottom-0"></hr>
      </div>
      <div className="items-center pr-1 mt-4">
        <input
          className="rounded-md rounded-r-none my-1 w-10/12 p-2 text-slate-900 h-15"
          type="text"
          placeholder="Hey..."
          value={curMessage}
          onChange={(event) => {
            setCurMessage(event.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button className="bg-slate-500 hover:bg-slate-700 rounded-md rounded-l-none w-2/12 p-2" onClick={sendMessage}>&rArr;</button>
      </div>
    </div>
  )
}
