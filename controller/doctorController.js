const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');

//register a new doctor if it's not present
module.exports.registerDoc = function (req, res) {
    try {
        // search for doctor
        Doctor.findOne({ email: req.body.email }).then((doc) => {
            if (doc) {
                return res.status(200).json({
                    message: 'Already Registered, Please Login to Continue !!',
                    data: {
                        doctor: doc,
                    }
                })
            } else {
                // if not found create one
                Doctor.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }).then((doc) => {
                    if (doc) {
                        return res.status(200).json({
                            message: 'You are registered Successfully!!',
                            data: {
                                doctor: doc,
                            }
                        });
                    }
                });
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

// login Doctor and generate jwt token
module.exports.loginDoc = async function (req, res) {
    // find doctor
    const doc = await Doctor.findOne({ email: req.body.email });
    if (doc) {
        // if passowrd doesn't match
        if (doc.password != req.body.password) {
            return res.status(422).json({
                message: "Invalid username or password",
            });
        } else {
            // generate token by passing doctor ID.
            return res.status(200).json({
                message: "logIn successful",
                data: {
                    token: jwt.sign(doc.id, 'blahSomething'),
                }
            })
        }
    } else {
        return res.status(404).json({
            message: "Doctor not found",
        });
    }
}