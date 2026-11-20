# Swipe Functionality for Coy

A standalone implementation of Coy's swipe-based profile discovery feature, inspired by Bumble and Tinder. Includes a placeholder Home tab and a functional Discover tab.

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** SQLite (better-sqlite3)
- **Animations:** Framer Motion

## Features
- Placeholder Home tab.
- Discover profiles one at a time.
- Like or pass using swipe gestures or buttons.
- Mutual likes create matches.
- View confirmed matches.
- Persist swipes and matches using SQLite.

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/AroraJeetansh/Coy-Assignment.git
cd Coy-Assignment
```

**2. Start the backend**
```bash
cd server
npm install
npm run dev
```

**3. Start the frontend** (in a separate terminal)
```bash
cd client
npm install
npm run dev
```

Open http://localhost:3000.

## Database Setup
- SQLite database is initialized automatically when the backend starts.
- Database location: `server/src/database/coy.db`.
- Use [DB Browser for SQLite](https://sqlitebrowser.org/) to open the database and execute SQL queries to insert demo profiles.
- Ensure the `profiles` table contains demo data before testing.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed` | Fetch profiles |
| POST | `/api/swipe` | Record a like or pass |
| GET | `/api/matches` | Fetch mutual matches |
