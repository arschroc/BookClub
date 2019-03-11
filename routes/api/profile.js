const express = require("express");
const router = express.Router();

//Test Route
// @route   GET api/users/profile
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

module.exports = router;
