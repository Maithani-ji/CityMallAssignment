// backend/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const routes = require('./routes');
const initWebSocket = require('./websocket/socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

global.emitUpdate = (event, data) => io.emit(event, data);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', routes); // All backend routes

initWebSocket(io); // WebSocket setup

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
