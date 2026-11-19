const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const userId = 1;

    const matches = db.prepare(`
      SELECT
        profiles.*,
        matches.created_at AS matched_at
      FROM matches
      JOIN profiles
        ON profiles.id = CASE
          WHEN matches.user_one_id = ? THEN matches.user_two_id
          ELSE matches.user_one_id
        END
      WHERE matches.user_one_id = ?
         OR matches.user_two_id = ?
    `).all(userId, userId, userId);

    res.json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    console.error("Matches error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
    });
  }
});

module.exports = router;
