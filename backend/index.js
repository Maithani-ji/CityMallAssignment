require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const disasterRoutes = require('./routes/disaster.routes');
const { setupWebSocket } = require('./websocket/socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

setupWebSocket(io);

app.use(cors());
app.use(express.json());
app.use('/api/disasters', disasterRoutes);

app.get('/', (req, res) => {
  res.send('Disaster Response Platform API running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});