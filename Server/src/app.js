import express from "express";
import dotenv from "dotenv";
import connectDB from "./Utils/dbConnection.js";
import cors from "cors";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// MongoDB connection
connectDB();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Socket.IO Logic
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join Room
  socket.on("join-room", ({ roomId, emailId }) => {
    if (!roomId || !emailId) {
      console.error("Invalid join-room data");
      return;
    }
    console.log(`User ${emailId} joined room ${roomId}`);
    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.to(roomId).emit("user-joined", { emailId });
  });

  // Call User
  socket.on("call-user", ({ emailId, offer }) => {
    const fromEmail = socketToEmailMapping.get(socket.id);
    const targetSocketId = emailToSocketMapping.get(emailId);
    if (targetSocketId) {
      socket.to(targetSocketId).emit("incoming-call", { from: fromEmail, offer });
    } else {
      console.log(`No active user found for email: ${emailId}`);
    }
  });

  // Call Accepted
  socket.on("call-accepted", ({ emailId, answer }) => {
    const targetSocketId = emailToSocketMapping.get(emailId);
    if (targetSocketId) {
      socket.to(targetSocketId).emit("call-accepted", { answer });
    } else {
      console.log(`No active user found for email: ${emailId}`);
    }
  });

  // ICE Candidate
  socket.on("ice-candidate", ({ emailId, candidate }) => {
    const targetSocketId = emailToSocketMapping.get(emailId);
    if (targetSocketId) {
      socket.to(targetSocketId).emit("ice-candidate", { candidate });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    const email = socketToEmailMapping.get(socket.id);
    if (email) {
      emailToSocketMapping.delete(email);
      socketToEmailMapping.delete(socket.id);
    }
  });
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to the WebRTC server!");
});

// Routes
import authRoutes from "./Routes/auth.routes.js";
app.use("/api/auth", authRoutes);
