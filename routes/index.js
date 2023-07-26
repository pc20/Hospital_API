const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');


//to handle all routes of /doctors url
router.use('/doctors', require('./doctorsRoute'));

//to handle all routes od /patient url
router.use('/patients', require('./patientsRoute'));

// to get all reports of all patients
router.get('/reports/:status', patientController.allReports);

module.exports = router;