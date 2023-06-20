const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const authHandler = require('../middleware/authHandler');

router.route('/dashboard').get(authHandler.protect, mainController.dashboard);
router.route('/login').post(mainController.login);

module.exports = router;
