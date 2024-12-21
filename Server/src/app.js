import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./Utils/dbConnection.js";
import cors from 'cors'

dotenv.config();

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//Connecting mongoDb
connectDB();

// Middleware to parse incoming JSON data
app.use(express.json());

//Setting up cors
const corsOptions = {
  origin:"http://localhost:5173",
  methods:"GET, PUT",
  credentials: true,
};

app.use(cors(corsOptions));

//importing routes
import authRoutes from './Routes/auth.routes.js'


// Basic route

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use('/api/auth',authRoutes)


