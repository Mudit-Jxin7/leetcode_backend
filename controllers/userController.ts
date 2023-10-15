import express, { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../db/userSchema";

const authInput = z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(6).max(20),
  name: z.string().min(1).max(20),
});

dotenv.config();

export const userRegister = async (req: Request, res: Response) => {
  const parsedInput = authInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      error: "There was an error while parsing the input",
    });
  } else {
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const name = parsedInput.data.name;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(403).json("User already exists");
      }

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ email });
    } catch (error) {
      console.log(error);
      res.status(500).json("Error registering user");
    }
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const parsedInput = authInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      error: "There was an error while parsing the input",
    });
  } else {
    try {
      const email = parsedInput.data.email;
      const password = parsedInput.data.password;
      const user = await User.findOne({ email });

      if (
        user &&
        user.password &&
        (await bcrypt.compare(password, user.password))
      ) {
        const secret = process.env.SECRET;

        if (!secret) {
          return res
            .status(500)
            .json("Missing SECRET in environment variables");
        }

        const token = jwt.sign({ email, role: "user" }, secret);
        res.status(201).json({ message: "Logged in successfully", token });
      } else {
        res.status(403).json("Wrong credentials");
      }
    } catch (error) {
      res.status(500).json("Error logging in");
    }
  }
};
