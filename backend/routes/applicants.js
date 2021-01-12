const router = require('express').Router();
let Applicant = require('../models/applicant.model');

router.route('/').get((req, res) => {
    Applicant.find()
        .then(applicants => res.json(applicants))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;        
    const email = req.body.email;
    const institute = req.body.education.institute;
    const start_year = Date.parse(req.body.education.start_year);
    const end_year = Date.parse(req.body.education.end_year);
    const skills = req.body.parse;
    const total_rating = +Number(req.body.total_rating);
    const total_number_of_ratings = +Number(req.body.total_number_of_ratings);

	const newApplicant = new Applicant({
        name,
        email,
        education:
        {
            institute,
            start_year,
            end_year,
        },
        skills,
        total_rating,
        total_number_of_ratings
	});

    newApplicant.save()
	    .then(() => res.json('Applicant added!'))
	    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;