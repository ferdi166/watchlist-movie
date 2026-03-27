import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

config();
connectDB();

const app = express();

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movie", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

app.use("/", (req, res) => {
    res.send("Watchlist Movie API is running!");
});

export default app;