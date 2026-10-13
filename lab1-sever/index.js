const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
// Cấu hình Socket.IO
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('Một thiết bị vừa kết nối:', socket.id);

    socket.on('join_group', (userName) => {
        console.log(`${userName} đã tham gia nhóm chat`);
    });

    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('Thiết bị ngắt kết nối:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});