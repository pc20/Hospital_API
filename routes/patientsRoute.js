const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');
const passport = require('passport');

// register patient
router.post('/register', passport.authenticate('jwt', { session: false }), patientController.registerPaitent);

// create report
router.post('/:id/create_report', passport.authenticate('jwt', { session: false }), patientController.createReport);

// Get patient reports
router.get('/:id/all_reports', patientController.patientReports);
module.exports = router;