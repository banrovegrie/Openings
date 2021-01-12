const mongoose = require('mongoose');
require('mongoose-type-email');

const recruiterSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: mongoose.SchemaTypes.Email, required: true},
        contact: {type: Number, required: true},
        bio: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter;