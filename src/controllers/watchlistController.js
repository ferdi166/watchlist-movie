import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes, userId } = req.body;

    // verify movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    // check if already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        }
    })

    if (existingInWatchlist) {
        return res.status(400).json({ error: "Movie already in the watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })

    return res.status(201).json({
        status: "Success",
        data: {
            watchlistItem
        }
    })
}

export const updateWatchlistItem = async (req, res) => {
    const { status, rating, notes } = req.body;

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id }
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // ensure only owner can update
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" });
    }

    // build update data
    const updatedData = {};
    if (status !== undefined) updatedData.status = status.toUpperCase();
    if (rating !== undefined) updatedData.rating = rating;
    if (notes !== undefined) updatedData.notes = notes;

    // updated watchlist item
    const updatedItem = await prisma.watchlistItem.update({
        where: { id: req.params.id },
        data: updatedData
    });

    return res.status(200).json({
        status: "Success",
        data: {
            watchlistItem: updatedItem
        }
    })
}

export const removeFromWatchlist = async (req, res) => {
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id }
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to delete this watchlist item" });
    }

    await prisma.watchlistItem.delete({
        where: { id: req.params.id }
    });

    return res.status(200).json({
        status: "Success",
        message: "Movie removed from watchlist"
    })
}