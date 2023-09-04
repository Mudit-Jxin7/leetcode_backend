const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    likedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
