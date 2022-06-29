const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();

const port = 5000 || process.env.PORT;
const users=[{}];
app.use(cors());
app.get('/',(req,res)=>{
   res.send("Hello Duniya");
})
const server = http.createServer(app);

const io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
    })
    socket.emit('welcome',{user: "Admin",message:`Welcome to the chat ${users[socket.id]}`});
    socket.broadcast.emit("userjoined",{user:"Admin",message:`${users[socket.id]} has joined`});
    socket.on('leave',(data)=>{
        console.log(data.user, data.message);
    })
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message})
    })
    socket.on('disconnect',()=>{
        console.log('user left');
    })
});
server.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})