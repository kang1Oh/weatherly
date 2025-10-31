const express = require('express');
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // compare with environment variables
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // success → return a token (static or from env)
    return res.json({ success: true, token: process.env.ADMIN_TOKEN });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
