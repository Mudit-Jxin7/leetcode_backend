const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const courseRouter = require('./routes/courseRoute');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


dotenv.config();
const PORT = 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
