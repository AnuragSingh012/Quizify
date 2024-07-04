import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(201).json({ message: "OK", users });
  } catch (err) {
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send("User not registerd");
    const isPasswordCorrect = await compare(password.toString(), user.password);
    if (!isPasswordCorrect) return res.status(403).send("Incorrect password");

    res.clearCookie("auth_token", {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      signed: true,
    });

    const token = createToken(user._id.toString(), user.username, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", username: user.username, email: user.email });
  } catch (err) {}
};

export const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not registerd or Token malfunctioned");
    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).send("Permission didn't work");
    return res
      .status(200)
      .json({ message: "OK", username: user.username, email: user.email });
  } catch (err) {}
};

export const userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(401).send("username already exists");
    const hashedPassword = await hash(password.toString(), 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // create token and store cookie

    res.clearCookie("auth_token", {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      signed: true,
    });

    const token = createToken(user._id.toString(), user.username, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", username: user.username, email: user.email });
  } catch (err) {
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("auth_token", {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      signed: true,
    });

    return res.status(200).send("logout sucessfully");
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
