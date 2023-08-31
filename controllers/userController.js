const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../db/userSchema');

dotenv.config();

const userRegister = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json('User already exists');
        }

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ email });
    } catch (error) {
        console.log(error);
        res.status(500).json('Error registering user');
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email, role: 'user' }, process.env.SECRET);
            res.json({ message: 'Logged in successfully', token });
        } else {
            res.status(403).json('Wrong credentials');
        }
    } catch (error) {
        res.status(500).json('Error logging in');
    }
};

module.exports = {
    userRegister,
    userLogin
};