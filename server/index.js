const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/',(req,res)=>res.send('Hello from server'))

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection',(socket)=>{
    console.log("new connections",socket.id)

    socket.on('disconnect',()=>{
        console.log('User had left',socket.id)
    })
})

const PORT = process.env.PORT || 8000
server.listen(PORT,()=>console.log(`Server running at port ${PORT}`))