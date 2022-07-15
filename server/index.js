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
    socket.on('joined',(data)=>{
        users[socket.id]=data.user;
        console.log(`${data.user} has joined`);
        socket.emit('welcome',{user: "Admin",message:`Welcome to the chat ${users[socket.id]}`});
        socket.broadcast.emit("userjoined",{user:"Admin",message:`${users[socket.id]} has joined`});
    })
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
    })
    socket.on('disconnected',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});
server.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})