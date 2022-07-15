import React from "react";
import './Chat.css';
import {user} from '../Join/Join';
import socketIO from 'socket.io-client';
import { useEffect } from "react";
import { useState } from "react";
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
const ENDPOINT = "http://localhost:5000/"
// eslint-disable-line no-use-before-define
let socket;
const Chat = () => {
  const [id, setid] = useState("");
  const [text,settext] = useState("");
  const [messages, setmessage] = useState([]);
 const send = ()=>{
  const message = document.getElementById('chatinput').value;
  socket.emit('message',{message,id}) ;
  document.getElementById('chatinput').value = "";
 }
  
 useEffect(() => {
  socket = socketIO(ENDPOINT, { transports: ['websocket'] });
  
  socket.on("connect",()=>{
       alert("Connected");
       setid(socket.id);
  })  

  console.log(socket);
  socket.emit('joined',{user});

  socket.on('welcome',(data)=>{
    setmessage([...messages,data]);
    console.log(data.user,data.message)
  })

  socket.on('userjoined',(data)=>{
    setmessage([...messages,data]);
    console.log(data.user,data.message);
  })

  socket.on('leave', (data) => {
    setmessage([...messages, data]);
    console.log(data.user, data.message);
  })

  return ()=>{
    socket.emit('disconnected');
    socket.off();
  }

 },[])

 useEffect(() => {
   socket.on('sendMessage',(data)=>{
    setmessage([...messages,data]);
    console.log(data.message,data.user,data.id);
   })
   return () => {
    socket.off();
   }
 }, [messages])
 
 
 
  return (
    <div className="ChatPage">
      <div className="Chatcontainer">
         <div className="header">
         <h2>fSociety</h2>
          <a href="/"> <img src="https://www.freeiconspng.com/thumbs/close-icon/black-close-icon-3.png" alt="Close" /></a>
         </div>
         <ReactScrollToBottom className="chatBox">
         {messages.map((element,i)=>{
          return <Message user={(element.id === id) ?'' :element.user} message={element.message} mov={(element.id === id) ? 'right' : 'left'}/>
         })}
         </ReactScrollToBottom>
         <div className="inputBox">
             <input type="text" onChange={(e)=>{settext(e.target.value)}} value={text} id="chatinput" />
             <button className="sendBtn" onClick={send}> <i class="fa fa-paper-plane" aria-hidden="true"/>Send</button>
         </div>
      </div>
    </div>
  )
}

export default Chat;