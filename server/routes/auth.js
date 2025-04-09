const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { validateLogin, validateRegister } = require('../middleware/validation');

// Register new user
router.post('/register', validateRegister, authController.register);

// Login user
router.post('/login', validateLogin, authController.login);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
