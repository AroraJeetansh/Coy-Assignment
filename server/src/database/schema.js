const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    photo TEXT,
    bio TEXT,
    location TEXT,
    interests TEXT
  );

  CREATE TABLE IF NOT EXISTS swipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    swiper_id INTEGER NOT NULL,
    swiped_id INTEGER NOT NULL,
    action TEXT NOT NULL CHECK(action IN ('like', 'pass')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(swiper_id, swiped_id),
    CHECK(swiper_id != swiped_id),
    FOREIGN KEY (swiper_id) REFERENCES profiles(id),
    FOREIGN KEY (swiped_id) REFERENCES profiles(id)
  );

  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_one_id INTEGER NOT NULL,
    user_two_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_one_id, user_two_id),
    CHECK(user_one_id < user_two_id),
    FOREIGN KEY (user_one_id) REFERENCES profiles(id),
    FOREIGN KEY (user_two_id) REFERENCES profiles(id)
  );
`);

console.log("Database tables initialized successfully.");