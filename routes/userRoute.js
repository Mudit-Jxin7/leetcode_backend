const express = require('express');
const { userRegister, userLogin } = require('../controllers/userController');

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
