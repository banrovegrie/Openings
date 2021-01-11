const mongoose = require('mongoose');
require('mongoose-type-email');

const jobSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        recruiter: 
        {
            name: {type: String, required: true},
            email: {type: mongoose.SchemaTypes.Email, required: true},
        },
        number_of_applications: {type: Number, required: true},
        number_of_positions: {type: Number, required: true},
        date_of_posting: {type: Date, required: true},
        deadline: {type: Date, required: true}, 
        skills: {type: Array, required: true},
        type_of_job: {type: String, required: true},
        duration: {type: String, required: true},
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