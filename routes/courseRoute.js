const express = require('express');
const { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { postReview, getReview } = require('../controllers/reviewController');
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.route('/createcourse').post(authenticateJwt, createCourse);
router.route('/getallcourses').get(getAllCourses);
router.route('/getcourse/:courseId').get(authenticateJwt, getCourse);
router.route('/updatecourse/:courseId').put(authenticateJwt, updateCourse);
router.route('/deletecourse/:courseId').delete(authenticateJwt, deleteCourse);

router.route('/review/:courseId').post(authenticateJwt, postReview);
router.route('/getreview/:courseId').get(authenticateJwt, getReview);

module.exports = router;