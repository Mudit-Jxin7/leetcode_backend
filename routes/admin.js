const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const router = express.Router();
dotenv.config();

const ADMIN = [];

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (ADMIN.find(user => user.username === username)) {
        res.status(403).json('User already exists');
    } else {
        ADMIN.push({ username, password: hashedPassword });
        res.status(200).json({ username });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = ADMIN.find(admin => admin.username === username);

    if (admin && await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json('Wrong credentials');
    }
});

module.exports = router;

