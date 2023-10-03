const express = require('express');
const { adminRegister, adminLogin, getAdmin } = require('../controllers/adminController');
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(adminRegister);
router.route("/login").post(adminLogin);
router.route("/me").get(authenticateJwt, getAdmin);

module.exports = router;
