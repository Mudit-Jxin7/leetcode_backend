const express = require('express');

const router = express.Router();

const USER = [];

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (USER.find(user => user.username === username)) {
        res.status(401).json('user already exists');
    } else {
        USER.push({ username, password });
        res.status(200).json({ username, password });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = USER.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json('Login successful');
    } else {
        res.status(401).json('Wrong credentials');
    }
})

module.exports = router;