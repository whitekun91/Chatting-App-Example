const express = require("express");
const { client, dbconnect } = require('./config/dbconnect');
const methodOverride = require('method-override');

const port = 3000;
const app = express();

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(methodOverride("_method"));

dbconnect();

app.use("/", require("./routes/loginRoutes"));

const users = {};

// Socket.IO event handling
io.on('connection', (socket) => {
  // IF login, server send message
  socket.on('newUser', function (name) {
    socket.name = name;
    users[name] = socket.id;
    io.sockets.emit('system', { message: name + 'is login.' });
  });

  // whisper event
  socket.on('whisper', function (data) {
    const name = data.name;
    const pureMsg = data.pureMsg;
    const target = data.target;
    const targetSocketId = users[target];

    // (chat.ejs) message send to client
    socket.emit('whisper', { name, pureMsg, self: true });
    socket.to(targetSocketId).emit('whisper', { name, pureMsg, self: false });
  });

  // normal chat event
  socket.on('send', async (data) => {
    const name = data.name;
    const msg = data.msg;

    // all_chat_log table -->  query
    const query = 'INSERT INTO all_chat_log (username, message) VALUES ($1, $2) RETURNING *;';
    const values = [name, msg];
    await client.query(query, values);

    // (chat.ejs) message send to client
    socket.emit('message', { name, msg, self: true });
    socket.broadcast.emit('message', { name, msg, self: false });
  });

  // load message event
  socket.on('get', async (data) => {
    const query = 'SELECT username, message FROM all_chat_log';
    const result = await client.query(query);
    const rows = result.rows;

    rows.forEach(user => {
      const name = user.username;
      const msg = user.message;

      io.sockets.emit('getLog', { name, msg });
    })
  })

  // IF logout, server send message
  socket.on('disconnect', function () {
    socket.broadcast.emit('system', { type: 'disconnect', name: 'SERVER', message: socket.name + 'is out.' });
  });

});

server.listen(port, () => {
  console.log(`${port} is listening`);
});
