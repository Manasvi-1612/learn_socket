const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()

const {addUser,removeUser,getUser,getUsersInRoom} = require('./users')

app.use(cors())

app.get('/',(req,res)=>res.send('Hello from server'))

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection',(socket)=>{
    // console.log("new connections",socket.id)

    socket.on('join',({username,room},callback)=>{
        const {error,user} = addUser({id:socket.id,username,room})

        if(error)callback(error)

        //simple welcome message
        socket.emit('message',{user:'admin',text:`${user.username}, welcome to the room ${user.room}`})

        //sending message to everyone except the user that has joined within the room
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.username}, has joined!`})

        socket.join(user.room)
        
        //triggering some response immediately after the join event
        callback()
    })

    //when user sends a message to the server 
    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id)

        //within the same room emit the message to everyone
        io.to(user.room).emit('message',{user:user.username,text:message})

        callback()
    })

    socket.on('disconnect',()=>{
        console.log('User had left',socket.id)
    })
})

const PORT = process.env.PORT || 8000
server.listen(PORT,()=>console.log(`Server running at port ${PORT}`))