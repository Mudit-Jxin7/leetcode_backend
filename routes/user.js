const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const router = express.Router();
dotenv.config();

const USER = [];

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (USER.find(user => user.username === username)) {
        res.status(403).json('User already exists');
    } else {
        USER.push({ username, password: hashedPassword });
        res.status(200).json({ username });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = USER.find(user => user.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username, role: 'user' }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json('Invalid credentials');
    }
});


module.exports = router;