# Backend Course Project

A simple backend project following a Youtube tutorial, demonstrating
authentication, movie management, and watchlist features using Node.js,
Express.js and Prisma ORM.

## 📋 Table of Contents

- [⚙️ Installation](#-installation)
- [🚀 Usage](#-usage)
- [🙌 Credits](#-credits)
- [📝 License](#-license)

## ⚙️ Installation

1. Clone the repository:
   ```
   git clone https://github.com/ferdi166/watchlist-movie.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables:
   ```
   DATABASE_URL=""  # Database connection string
   NODE_ENV=""      # Environment mode (development or production)
   JWT_SECRET=""    # Secret key for JWT authentication
   ```
4. Run database migrations:
   ```
   npx prisma migrate dev
   ```
5. Start the server:
   ```
    npm run dev
   ```

## 🚀 Usage

- Register and log in to get an authentication token.
- Use the token to access protected routes for watchlists.
- Example endpoints:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/movies`
  - `POST /api/watchlist`

## 🙌 Credits

This project was created by following the tutorial:

- [Node.js Backend Course - PedroTech (Youtube)](https://youtu.be/g09PoiCob4Y?si=RmHlzogHwl5A4I_H)

## 📝 License

MIT License
