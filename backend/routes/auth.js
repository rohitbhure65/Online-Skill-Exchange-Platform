const express = require('express');
const authController = require('../Controller/auth'); 
const router = express.Router();

// User authentication routes
router
    .post('/signup', authController.signup)            
    .post('/login', authController.login)                 
    .post('/logout', authController.logout)              

module.exports = router;
