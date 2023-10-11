import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../db/userSchema";

dotenv.config();

export const userRegister = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json("User already exists");
    }

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ email });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error registering user");
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const secret = process.env.SECRET;

      if (!secret) {
        return res.status(500).json("Missing SECRET in environment variables");
      }

      const token = jwt.sign({ email, role: "user" }, secret);
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json("Error logging in");
  }
};
