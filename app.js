
const express = require('express');
// const { createServer } = require('node:http');
const { createServer } = require('https');
// const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
// const io = new Server(server);
const io = new Server(server, { cors: { origin: '*' } });

// This can be activated to activate the indexfile on
// opening the port in the browser.
// Then the index html needs to contain the css & script inline.
// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log('new user socket id: '+ socket.id);
    let msg1 = 'user connected';

    io.emit('user connected', msg1);

    socket.on('chat message', (msg) => {
        // console.log(socket.id);
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log('user socket id: '+ socket.id);
        let msg1 = 'user disconnected';

        io.emit('user disconnected', msg1);
    });
});

server.listen(3001, () => {
    console.log('server running at http://localhost:3001');
});
