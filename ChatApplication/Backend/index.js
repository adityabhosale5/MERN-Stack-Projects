
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const messagesRoutes = require("./Routes/messagesRoutes");
// const userRouter = require("./Routes/user");

const app = express();
const socket = require("socket.io");


app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);


mongoose.connect('mongodb+srv://adityabhosale5247:aditya5247@cluster0.zdbg1h2.mongodb.net/chatapp').then(() => { 
    console.log("Connect Successfully") 
}).catch((err) => { 
    console.log(err.message)
});

const server = app.listen(5000, () => console.log('Server running on port 5000'));

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});