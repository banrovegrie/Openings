const router = require('express').Router();
let Applicant = require('../models/applicant.model');


// Get all applicants
router.route('/').get((req, res) => {
    Applicant.find()
        .then(applicants => res.json(applicants))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Add new applicant
router.route('/add').post((req, res) => {
    const name = req.body.name;        
    const email = req.body.email;
    const password = req.body.password;
    const institute = req.body.education.institute;
    const start_year = Date.parse(req.body.education.start_year);
    const end_year = Date.parse(req.body.education.end_year);
    const skills = req.body.skills;
    //const total_rating = +Number(req.body.total_rating);
    //const total_number_of_ratings = +Number(req.body.total_number_of_ratings);

	const newApplicant = new Applicant({
        name,
        email,
        password,
        education:
        {
            institute,
            start_year,
            end_year,
        },
        skills
	});

    newApplicant.save()
	    .then(() => res.json('Applicant added!'))
	    .catch(err => res.status(400).json('Error: ' + err));
});


// Get applicant for a given id
router.route('/:_id').get((req, res) => {
	Applicant.findById(req.params._id)
	  .then(applicant => res.json(applicant))
	  .catch(err => res.status(400).json('Error: ' + err));
});


// Update applicant details
/*
{
    "education":
    {
        "institute": "---",
        "start_year": "---",
        "end_year": "---"
    },
    "skills": "---"
}
*/
router.route('/update/:_id').post((req, res) => {
	Applicant.findById(req.params._id)
		.then(applicant => {
            applicant.education.institute = req.body.education.institute;
            applicant.education.start_year = Date.parse(req.body.education.start_year);
            applicant.education.end_year = Date.parse(req.body.education.end_year);
            applicant.skills = req.body.skills;
			applicant.save()
				.then(() => res.json('Profile updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
	  })
	  .catch(err => res.status(400).json('Error: ' + err));
});

// Update job rating (by recruiter)
router.route('/rating/update/:_id').post((req, res) => {
	Applicant.findById(req.params._id)
		.then(applicant => {
			applicant.total_rating = req.body.total_rating;
			applicant.total_number_of_ratings = req.body.total_number_of_ratings;
			applicant.save()
				.then(() => res.json('Rating updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// Add application by applicant
/*
{
	"id": "---",
	"title": "---",
	"email": "---",
}
*/
router.route('/apply/:_id').post((req, res) => {
	Applicant.findById(req.params._id)
		.then(applicant => {
			const application = {
				id: req.body.id,
				title: req.body.title,
				email: req.body.email,
				status: "Applied"
			};
		    applicant.applications.push(application);
			applicant.save()
				.then(() => res.json('Added application details!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});


// Update status of an application of applicant
/*
{
	"status": "---"
}
*/
router.route('/update/status/:_id/:applications_id').post((req, res) => {
    Applicant.findById(req.params._id)
        .then(applicant => {
            applicant.applications.forEach(application =>{
                if (application.id === req.params.applications_id) {
					application.status = req.body.status;
				}
            });
            applicant.save()
                .then(() => res.json('Status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;