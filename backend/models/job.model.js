const mongoose = require('mongoose');
require('mongoose-type-email');

const jobSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        recruiter: 
        {
            id: {type: String, required: true},
            name: {type: String, required: true},
            email: {type: mongoose.SchemaTypes.Email, required: true},
        },
        applications:
        {
            type: [{
                id: {type: String},
                name: {type: String},
                email: {type: mongoose.SchemaTypes.Email},
                SOP: {type: String},
                status: {type: String}
            }],
            default: []
        },
        max_number_of_applications: {type: Number, required: true},
        max_number_of_positions: {type: Number, required: true},
        deadline: {type: Date, required: true}, 
        skills: {type: [String], required: true},
        type_of_job: {type: String, required: true},
        duration: {type: Number, required: true},
        salary: {type: Number, required: true},
        total_rating: {type: Number, required: true},
        total_number_of_ratings: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;