import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../db/adminSchema";

dotenv.config();

export const adminRegister = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(403).json("User already exists");
    }

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(200).json({ email });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error registering user");
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (
      admin &&
      admin.password &&
      (await bcrypt.compare(password, admin.password))
    ) {
      const secret = process.env.SECRET;

      if (!secret) {
        return res.status(500).json("Missing SECRET in environment variables");
      }

      const token = jwt.sign({ id: admin._id }, secret, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json("Error logging in");
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  const admin = await Admin.findOne({ _id: req.userId });
  if (admin) {
    res.json({ email: admin.email });
  } else {
    res.status(403).json({ message: "Admin not logged in" });
  }
};
