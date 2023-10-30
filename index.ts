import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute";
import adminRouter from "./routes/adminRoute";
import courseRouter from "./routes/courseRoute";
import paymentRoute from "./routes/paymentRoute";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const PORT = 4000;

declare global {
  namespace Express {
    interface Request {
      userId: string | undefined;
    }
  }
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
  console.error("MONGO_URL environment variable is not defined.");
  process.exit(1);
}

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/payment", paymentRoute);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
