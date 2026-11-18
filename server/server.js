const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./src/database/schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Coy Discover API is running!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});