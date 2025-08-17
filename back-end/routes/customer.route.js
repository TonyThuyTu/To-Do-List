const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller');

//api sign up
router.post('/signup', CustomerController.signup);

//api sign up
router.post('/login', CustomerController.login);

module.exports = router;