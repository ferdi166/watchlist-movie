import { prisma } from '../config/db.js';

export const getAllMovie = async (req, res) => {
    try {
        const movie = await prisma.movie.findMany();

        if (movie.length === 0) {
            return res.status(404).json({ error: "Movie is empty" });
        }

        return res.status(201).json({
            status: 'Success',
            data: movie,
        })
    } catch (error) {
        return res.status(404).json({ status: "Failed", error: error.message });
    }
}