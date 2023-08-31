const express = require('express');
const { adminRegister, adminLogin } = require('../controllers/adminController');

const router = express.Router();

router.route("/register").post(adminRegister);
router.route("/login").post(adminLogin);

module.exports = router;
