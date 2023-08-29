const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const ADMIN = [];

app.post('/admin/register', (req, res) => {
    const { username, password } = req.body;
    if (ADMIN.find(user => user.username === username)) {
        res.status(401).json('user already exists');
    } else {
        ADMIN.push({ username, password });
        res.status(200).json({ username, password });
    }
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    const user = ADMIN.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json('Login successful');
    } else {
        res.status(401).json('Wrong credentials');
    }
});



app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
