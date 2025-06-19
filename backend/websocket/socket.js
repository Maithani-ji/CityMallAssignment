function setupWebSocket(io) {
    io.on('connection', (socket) => {
      console.log('[WebSocket] Client connected');
  
      socket.on('disconnect', () => {
        console.log('[WebSocket] Client disconnected');
      });
    });
  
    global.emitUpdate = (channel, data) => {
      io.emit(channel, data);
    };
  }
  
  module.exports = { setupWebSocket };