import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { postReview, getReview } from "../controllers/reviewController";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.route("/createcourse").post(authenticateJwt, createCourse);
router.route("/getallcourses").get(getAllCourses);
router.route("/getcourse/:courseId").get(getCourse);
router.route("/updatecourse/:courseId").put(updateCourse);
router.route("/deletecourse/:courseId").delete(deleteCourse);

router.route("/review/:courseId").post(authenticateJwt, postReview);
router.route("/getreview/:courseId").get(getReview);

export default router;
