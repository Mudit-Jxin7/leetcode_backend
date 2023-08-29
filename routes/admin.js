const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Admin = require('../db/adminSchema');

const router = express.Router();
dotenv.config();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(403).json('User already exists');
        }

        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        res.status(200).json({ email });
    } catch (error) {
        console.log(error);
        res.status(500).json('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const admin = await Admin.findOne({ email });

        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({ email, role: 'admin' }, process.env.SECRET);
            res.json({ message: 'Logged in successfully', token });
        } else {
            res.status(403).json('Wrong credentials');
        }
    } catch (error) {
        res.status(500).json('Error logging in');
    }
});

module.exports = router;
