
// This app starts a server and listens on port 3000 for connections
const app = express();
// allows Node.js to transfer data over http
const http = require('http');
// creates HTTP server
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// passing it a string of HTML then sends a file to the client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});
// when the socket client is loaded on a page, it begins connecting a socket 
io.on('connection', (socket) => {
  console.log('a user is ready to make a Hot Take');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// app listening on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});