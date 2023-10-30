import express, { Request, Response } from "express";
import User from "../db/userSchema";
import Course from "../db/courseSchema";
const stripe = require("stripe")(
  "sk_test_51O59p6SB2vD416D3TieBVsg9SSwLwUbdO7gcNKqOfdzj6MpnJcfOgtR01jRjsm5rvtMXOF27ufqmXgbjIeCajiyx00iiIJL3We"
);

export const makePayment = async (req: Request, res: Response) => {
  try {
    const course = req.body;
    console.log(course);

    const lineItems = course.map(
      (product: { title: string; price: number }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://127.0.0.1:5173/feed`,
      cancel_url: `http://127.0.0.1:5173/feed`,
    });

    res.json({ id: session.id });
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};
