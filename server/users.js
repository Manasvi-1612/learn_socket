const users = []

const addUser = ({id,username,room}) =>{
    user=username.trim().toLowerCase()
    room=room.trim().toLowerCase()

    const existingUser = users.find((user)=>user.room===room && user.username===username)

    if(existingUser){
        return {error:'Username is taken'}
    }

    const user = {id,username,room}

    users.push(user)

    return {user}
}

const removeUser = (id) =>{
    const idx = users.findIndex((user)=> user.id===id)

    return idx!==-1 ? users.splice(idx,1)[0]: null 
}

const getUser = (id) => users.find(user => user.id===id)

const getUsersInRoom = (room) => users.filter(user=>user.room===room)

module.exports = {addUser,removeUser,getUser,getUsersInRoom}