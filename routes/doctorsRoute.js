const express = require('express');
const router = express.Router();
const docCotroller = require('../controller/doctorController');

// create doctor
router.post('/register', docCotroller.registerDoc);

router.get('/login', docCotroller.loginDoc);

module.exports = router;