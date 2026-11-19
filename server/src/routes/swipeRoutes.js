
const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { userId, profileId, action } = req.body;

    if (!userId || !profileId || !["like", "pass"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid swipe data",
      });
    }

    if (userId === profileId) {
      return res.status(400).json({
        success: false,
        message: "You cannot swipe on yourself",
      });
    }

    const insertSwipe = db.prepare(`
      INSERT INTO swipes (swiper_id, swiped_id, action)
      VALUES (?, ?, ?)
    `);

    insertSwipe.run(userId, profileId, action);

    let isMatch = false;

    if (action === "like") {
      const mutualLike = db.prepare(`
        SELECT id
        FROM swipes
        WHERE swiper_id = ?
        AND swiped_id = ?
        AND action = 'like'
      `).get(profileId, userId);

      if (mutualLike) {
        const userOne = Math.min(userId, profileId);
        const userTwo = Math.max(userId, profileId);

        db.prepare(`
          INSERT OR IGNORE INTO matches (user_one_id, user_two_id)
          VALUES (?, ?)
        `).run(userOne, userTwo);

        isMatch = true;
      }
    }

    res.json({
      success: true,
      message: "Swipe saved successfully",
      isMatch,
    });
  } catch (error) {
    console.error("Swipe error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save swipe",
    });
  }
});

module.exports = router;
