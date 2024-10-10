import './constants.js';
import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import sleepRoutes from "./Routers/sleepRoutes.js";
import moodRoutes from "./Routers/moodRoutes.js"; 
import userRoutes from "./Routers/userRoutes.js";
import postRoutes from "./Routers/postRoutes.js";

const app = express();

const port = process.env.PORT;

connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://zen-zone-raga.vercel.app',
];

app.use(express.json());

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



// Routes
app.use("/api/v1/sleep", sleepRoutes); 
app.use("/api/v1/mood", moodRoutes);   
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
