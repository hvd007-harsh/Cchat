import React from "react";
import './Chat.css';
import {user} from '../Join/Join';
import socketIO from 'socket.io-client';
import { useEffect } from "react";
import { useState } from "react";

const ENDPOINT = "http://localhost:5000/"

let socket;
const Chat = () => {
  const [id, setid] = useState("");
 const send = ()=>{
 const message = document.getElementById('chatInput').value;
  socket.emit('message',{message});
  document.getElementById('chatInput').value = "";
 }
  
 useEffect(() => {
  const socket = socketIO(ENDPOINT, {transports:['websocket']})

  socket.on("connect",()=>{
       alert("Connected");
  })  
  console.log(socket);
  socket.emit('joined',{user});
  socket.on('welcome',(data)=>{
    console.log(data.user,data.message)
  })
  socket.on('userjoined',(data)=>{
    console.log(data.user,data.message);
  })
  socket.on('leave',(data)=>{

  })
  return ()=>{
    socket.emit('disconnect');
    socket.off();
  }

 },[])
 
 
  return (
    <div className="ChatPage">
       <div>{user}</div>
      <div className="Chatcontainer">
         <div className="header"></div>
         <div className="chatBox"></div>
         <div className="inputBox">
             <input type="text" id="chatinput" />
             <button  className="sendBtn" onClick={send}> <i class="fa fa-paper-plane" aria-hidden="true"/>Send</button>
         </div>
      </div>
    </div>
  )
}

export default Chat;