const Patient = require('../models/patients');
const Doctor = require('../models/doctors');

// register patient if not present
module.exports.registerPaitent = async function (req, res) {
    try {

        // search for patient
        let patient = await Patient.findOne({ phoneNumber: req.body.phoneNumber });
        if (!patient) {
            // if not exist create one
            patient = await Patient.create({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                doctor: req.user._id,
            });
            return res.status(200).json({
                message: "Patient successfully registered",
                patientDetails: { ...patient._doc, doctor: req.user.name },
            });
        } else {
            return res.status(200).json({
                message: "Patient already registered. Please continue!!",
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

// create report
module.exports.createReport = async function (req, res) {
    try {
        // find patient
        const patient = await Patient.findById(req.params.id);
        const newReport = {
            status: req.body.status,
            createdBy: req.user.name,
        }
        // add report to patient
        patient.reports.push(newReport);
        patient.save();
        return res.status(200).json({
            message: "Report created successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

// fetch all reports belonging to a patient
module.exports.patientReports = async function (req, res) {
    try {
        // find patient
        const patient = await Patient.findById(req.params.id);
        if (patient) {
            // sort reports
            const doc = await Doctor.findById(patient.doctor);
            return res.status(200).json({
                name: patient.name,
                phoneNumer: patient.phoneNumber,
                doctor: doc.name,
                totalReports: patient.reports.length,
                reports: patient.reports.sort((a, b) => a.date - b.date),
            });
        } else {
            return res.status(404).json({
                message: "Patient not found",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}


// fetch all reports of all patients for particular status
module.exports.allReports = async function (req, res) {
    console.log(req.params.status);
    try {
        const patients = await Patient.find({
            "reports": { "$elemMatch": { "status": req.params.status } },
        });

        return res.status(200).json({
            noOfPatients: patients.length,
            patient: patients,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}