import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import helmet from 'helmet';

import AuthRoute from './Router/AuthRoute.js';
import UserRoute from './Router/UserRoute.js';
import PostRoute from './Router/PostRoute.js';
import FriendRoute from './Router/FriendRoute.js';
import Conversation from './Router/Conversation.js';
import Messages from './Router/Messages.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http'
import { Server } from "socket.io"

//socket
const app = express()
app.use(cors({

    origin: 'http://www.giangg.site',
    credentials: true

}));
app.use(express.json());
// Add headers before the routes are defined

const server = http.createServer(app)
// config io
const io = new Server(server, {
    cors: {
        origin: 'http://www.giangg.site',
        credentials: true
    }
});
io.listen(4000);
dotenv.config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb+srv://dbUsers:123@cluster0.qofi8wl.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'SocialMediaV2'
})
    .then(() => {
        console.log('mongodb has been connected')
        server.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`)
        })
    }

    )
    .catch(err => console.log(err))
// io connection
let onlineUser = []
io.on('connection', (socket) => {
    console.log(socket.id, 'connected')
    //event get user id

    socket.on('sendUserId', (userId) => {
        let isExist = onlineUser.findIndex(user => user.userId === userId) !== -1;
        if (isExist) {

        } else {
            onlineUser.push({
                socketId: socket.id,
                userId: userId
            })
            console.log('sendAllOnlineUser', onlineUser);

            io.emit('sendAllOnlineUser', onlineUser);

        }
    });
    socket.on('sendMess', (messData) => {
        if (messData.receiverId) {
            let receiverSocketId = onlineUser.find(user => user.userId === messData.receiverId)
            console.log(receiverSocketId?.socketId, 'check-----')
            io.to(receiverSocketId?.socketId).emit('receiverMess', messData)
        } else {
            // let sentUserId = onlineUser.find(user => user.socketId === socket.id)

            socket.broadcast.emit('receiverMess', messData)
        }


    })

    //disconnect
    socket.on('disconnect', () => {
        onlineUser = onlineUser.filter(user => user.socketId !== socket.id);
        io.emit('sendAllOnlineUser', onlineUser);

        console.log(socket.id, 'disconnect')
        console.log('online User', onlineUser)

    })
});


//router 
app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/users', UserRoute)
app.use('/api/v1/posts', PostRoute)
app.use('/api/v1/friends', FriendRoute)
app.use('/api/v1/conversations', Conversation)
app.use('/api/v1/messages', Messages)





