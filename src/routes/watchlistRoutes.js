import express from "express";
import {
    addToWatchlist,
    getWatchlistItem,
    removeFromWatchlist,
    updateWatchlistItem,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getWatchlistItem);
router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);

export default router;
