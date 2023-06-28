"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let activeUsers = [];
let onlineUsers = [];
const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
        onlineUsers.push({ username, socketId });
    console.log(onlineUsers, "::::::::");
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};
const socketConfig = (io) => {
    io.on("connection", (socket) => {
        console.log(`user connected ${socket.id}`.bg_magenta);
        socket.on("new-user-add", (newUserId) => {
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id });
            }
            console.log(activeUsers, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
            io.emit("get-users", activeUsers);
        });
        socket.on("newUser", (user) => {
            addNewUser(user?.userName, socket.id);
        });
        socket.on("sendNotification", (data) => {
            console.log(data, "kk");
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            console.log("Sending from socket to:", receiverId);
            console.log("Data:", data);
            if (user) {
                io.to(user.socketId).emit("getNotifications", data);
            }
        });
        socket.on("disconnect", () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            io.emit("get-users", activeUsers);
        });
        socket.on("send-message", (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            console.log("Sending from socket to:", receiverId);
            console.log("Data:", data);
            if (user) {
                io.to(user.socketId).emit("receive-message", data);
            }
        });
    });
};
exports.default = socketConfig;
