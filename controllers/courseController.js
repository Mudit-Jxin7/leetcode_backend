const express = require('express');
const dotenv = require('dotenv');
const Course = require('../db/courseSchema');

const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageLink,
            published,
            rating,
            instructor,
            duration,
            Language,
            videoLink,
            courseContent,
            prerequisite,
            enrollments,
        } = req.body;

        const newCourse = new Course({
            title,
            description,
            price,
            imageLink,
            published,
            rating,
            instructor,
            duration,
            Language,
            videoLink,
            courseContent,
            prerequisite,
            enrollments,
            createdAt: new Date(),
        });

        const savedCourse = await newCourse.save();

        res.status(201).json({
            message: 'Course created successfully',
            course: savedCourse,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create course',
            error: error.message,
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json({
            message: 'All courses retrieved successfully',
            courses: courses,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve courses',
            error: error.message,
        });
    }
};

const getCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found',
            });
        }

        res.status(200).json({
            message: 'Course retrieved successfully',
            course: course,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve course',
            error: error.message,
        });
    }
};

const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const updateData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
            new: true, // Return the updated course after the update
        });

        if (!updatedCourse) {
            return res.status(404).json({
                message: 'Course not found',
            });
        }

        res.status(200).json({
            message: 'Course updated successfully',
            course: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update course',
            error: error.message,
        });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        await Course.findByIdAndRemove(courseId);
        res.status(200).send('Course deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting course');
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse
};