const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findById(userId);
    return res.status(200).json({ user });
  } catch {
    console.log(err);
    return res.status(500).send(`server error`);
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body.user;
  if (!isEmail(email)) return res.status(401).send("invalid email");
  if (password.length < 6)
    return res.status(401).send("password must be atleast 6 characters");

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send("Invalid credentials");
    }

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecert,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send(`server Error`);
  }
});

module.exports = router;
