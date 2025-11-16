const User = require("../models/user");
const validate = require("../utils/validator");
const redisClient = require("../config/redis");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register controller
//register=signup
const signup = async (req, res) => {
  try {
    validate(req.body);
    const { firstName, emailId, phoneNumber, password } = req.body;
    req.body.password = await bcrypt.hash(password, 8);
    req.body.role = "user";
    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(201).json({
      message: "New user registered successfully",
      user: {
        id: user._id,
        email: user.emailId,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    res.status(400).send("some error occured while signing in: " + err);
  }
};

//login contoller-- api localhost:3000/user/login
const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("Invalid Cred details while loging inn"); // i am not telling the user konsa galat hai
    }
    const user = await User.findOne({ emailId });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid credss kindly recheck ur emailId or password");
    }
    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.emailId,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    res.status(401).send("Error occured while loging inn " + err);
  }
};

// logout
const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);
    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).send("Logged out successfully");
  } catch (err) {
    res.status(503).send("Error occured while loging out " + err);
  }
};

// adminregister-- only an admin can register a new admin
// from FE we need to pass the role as admin to register as a admin

const adminRegister = async (req, res) => {
  try {
    validate(req.body);
    const { firstName, emailId, password } = req.body;
    req.body.password = await bcrypt.hash(password, 8);
    // const user=await User.create(req.body);
    const user = await User.create({ ...req.body, role: "admin" });

    // while signing jwt here i have aslo added role as a payload
    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, {
      httpOnly: true, // nice aryah
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).send(`${user.role} Registered successfully`);
  } catch (err) {
    res.status(400).send("An error ocuured while registering admin " + err);
  }
};

module.exports = { signup, login, adminRegister, logout };
