const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
