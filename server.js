import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import { Server } from 'socket.io'
import { createServer } from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/public')))

const message = []
let users = []

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = createServer(app);
const io = new Server(server, { allowEIO3: true });
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  console.log('I\'ve added a listener on message event \n');

  socket.on('message', (event) => {
    console.log('Oh, I\'ve got something from ' + socket.id)
    // console.log(`${event.author}: ${event.content}`)
    message.push(event)
    socket.broadcast.emit('message', event)
    // io.to('UQy3C7XWRBxJ0RxeAAAE').emit('message', event)
  });

  socket.on('logged', (user) => {
    users.push({ user, id: socket.id })
    socket.broadcast.emit(
      'message',
      { author: 'Chat Bot', content: `${user} has joined the conversation!` }
    )
    console.log('users', users)
  })

  socket.on('disconnect', () => {
    let person;
    users = users.filter(el => {
      if (el.id !== socket.id) return el
      person = el
    })

    if (person?.user) {
      console.log('Oh, ' + person?.user + ' has left')
    } else {
      console.log('Oh, socket ' + socket.id + ' has left')
    }

    socket.broadcast.emit(
      'message',
      { author: 'Chat Bot', content: `${person?.user} has left the conversation... :(` }
    )
  });
});


server.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
