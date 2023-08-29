const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
