const mongooose = require('mongoose');

const patientSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    reports: [
        {
            status: {
                type: String,
                required: true,
                enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive - Admit"]
            },
            date: {
                type: Date,
                default: Date.now(),
            },
            createdBy: {
                type: String,
                required: true,
            }
        }
    ],
    doctor: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    }

},
    {
        timestamps: true,
    }

);

const Patient = mongooose.model('Patient', patientSchema);
module.exports = Patient;