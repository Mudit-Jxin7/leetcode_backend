const Course = require('../db/courseSchema');
const express = require('express');

const postReview = async (req, res) => {
    try {

        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const review = {
            user: req.user.user,
            text: req.body.text,
            createdAt: new Date(),
        };

        course.reviews.push(review);

        await course.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getReview = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId)
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const reviews = course.reviews;

        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    postReview,
    getReview
};