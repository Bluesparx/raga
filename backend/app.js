import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import sleepRoutes from "./Routers/sleepRoutes.js";
import moodRoutes from "./Routers/moodRoutes.js";  // Import mood routes
import userRoutes from "./Routers/userRoutes.js";

const app = express();

const port = process.env.PORT;

connectDB();

const allowedOrigins = [
  "*",
];

// Middleware
// Middleware
app.use(express.json()); // This line is essential for parsing JSON
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.use("/api/v1/sleep", sleepRoutes); 
app.use("/api/v1/mood", moodRoutes);   
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
