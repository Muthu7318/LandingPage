const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const PlansModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/nattar/image/upload/v1593464618/App/user_mklcpl.png";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  console.log(req.params);
  try {
    if (username.length < 1) {
      return res.status(401).send("Invalid user name");
    }
    if (!regexUserName.test(username)) {
      return res.status(401).send("Invalid user name");
    }
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(401).send("username already taken");
    }
    return res.status(200).send("Available");
  } catch (err) {
    console.log(err);
    return res.status(500).send(`server Error`);
  }
});

router.post("/", async (req, res) => {
  console.log("username is");
  console.log(req.username);
  const { name, email, username, password, bio, facebook, twitter, instagram } =
    req.body.user;
  if (!isEmail(email)) return res.status(401).send("invalid email");
  if (password.length < 6)
    return res.status(401).send("password must be atleast 6 characters");

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(401).send("user already registered");
    }
    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // let plansField = {};
    // plansField.user = user._id;
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
