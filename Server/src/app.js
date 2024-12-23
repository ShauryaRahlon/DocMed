import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./Utils/dbConnection.js";
import cors from 'cors'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'

dotenv.config();

const io = new Server({
  cors: true,
});
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

io.listen(8001);

//Connecting mongoDb
connectDB();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

//Setting up socket

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on('connection', (socket) => {
  console.log('New connection')
  socket.on('join-room', (data) => {
    const { roomId, emailId } = data;
    console.log('User', emailId, 'joined room', roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId)
    socket.join(roomId);
    socket.emit('joined-room', { roomId });
    socket.broadcast.to(roomId).emit('user-joined', { emailId });

  });

  socket.on('call-user', (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id)
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit('incoming-call', { from: fromEmail, offer });

  });

  socket.on('call-accepted', (data) => {
    const { emailId, answer } = data;
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit('call-accepted', {answer});

  });
})

//Setting up cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, PUT",
  credentials: true,
};

app.use(cors(corsOptions));

//importing routes
import authRoutes from './Routes/auth.routes.js'


// Basic route

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use('/api/auth', authRoutes)


