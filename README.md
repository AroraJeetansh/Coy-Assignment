# Swipe Functionality for Coy

A standalone implementation of Coy's swipe-based profile discovery feature, inspired by Bumble and Tinder. Includes a placeholder Home tab, Matches tab and a functional Discover tab.

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

## Screenshots
<img width="284" height="631" alt="image" src="https://github.com/user-attachments/assets/57658666-c110-477f-9902-d8e27eecf8a1" />
<img width="279" height="630" alt="image" src="https://github.com/user-attachments/assets/f4595da7-5d3f-4585-89bc-c4007f60b382" />
<img width="280" height="629" alt="image" src="https://github.com/user-attachments/assets/1f3d8d22-db36-4d96-9e93-867037ad9b8e" />

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
