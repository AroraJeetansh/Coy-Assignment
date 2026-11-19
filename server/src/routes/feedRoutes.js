
const express = require("express");
const db = require("../database/db");

const router = express.Router();

console.log("Feed routes loaded");

router.get("/", (req, res) => {
  try {
    const userId = 1;

    const profiles = db.prepare(`
      SELECT *
      FROM profiles
      WHERE id != ?
      AND id NOT IN (
        SELECT swiped_id
        FROM swipes
        WHERE swiper_id = ?
      )
    `).all(userId, userId);

    res.json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error("Feed error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
    });
  }
});

module.exports = router;
