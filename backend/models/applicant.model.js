const mongoose = require('mongoose');
require('mongoose-type-email');

const applicantSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: mongoose.SchemaTypes.Email, required: true},
        password: {type: String, required: true},
        education:
        {
            institute: {type: String, required: true},
            start_year: {type: Date, required: true},
            end_year: {type: Date, required: false},
        },
        skills: {type: [String], required: true},
        total_rating: {type: Number, required: true, default: 0},
        total_number_of_ratings: {type: Number, required: true, default: 0},
        applications:
        {
            type:[{
                id: {type: String},
                title: {type: String},
                email: {type: mongoose.SchemaTypes.Email},
                status: {type: String}
            }],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;