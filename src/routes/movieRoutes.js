import express from "express";
import {
    getAllMovie
} from "../controllers/movieController.js"

const router = express.Router();

router.get("/hello", (req, res) => {
    res.json({ message: "Hello" });
});

router.get("/", getAllMovie);

export default router;