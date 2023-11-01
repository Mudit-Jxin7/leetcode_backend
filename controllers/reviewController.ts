import express, { Request, Response } from "express";
import Course from "../db/courseSchema";
import User from "../db/userSchema";
import mongoose from "mongoose";

interface Review {
  user: mongoose.Types.ObjectId | undefined;
  text: any;
  createdAt: Date;
}

export const postReview = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const review: Review = {
      user: new mongoose.Types.ObjectId(req.userId),
      text: req.body.text,
      createdAt: new Date(),
    };

    course.reviews.push(review);

    await course.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReview = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const reviews = course.reviews;

    const reviewsWithUserNames = await Promise.all(
      reviews.map(async (review) => {
        const user = await User.findById(review.user);
        if (user) {
          return {
            //@ts-ignore
            ...review._doc,
            user: user.name,
          };
        }
        return review;
      })
    );

    res.status(200).json(reviewsWithUserNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
