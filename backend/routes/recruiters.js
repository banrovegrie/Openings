const router = require('express').Router();
let Recruiter = require('../models/recruiter.model');


// Get all recruiters
router.route('/').get((req, res) => {
    Recruiter.find()
        .then(recruiters => res.json(recruiters))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Add new recruiter
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contact = +Number(req.body.contact);
    const bio = req.body.bio;

	const newRecruiter = new Recruiter({
        name,
        email,
        password,
        contact,
        bio
	});

    newRecruiter.save()
	    .then(() => res.json('Recruiter added!'))
	    .catch(err => res.status(400).json('Error: ' + err));
});

// Get applicant for a given id
router.route('/:_id').get((req, res) => {
	Recruiter.findById(req.params._id)
	    .then(recruiter => res.json(recruiter))
	    .catch(err => res.status(400).json('Error: ' + err));
});

// Contact Number and Bio update
router.route('/update/:_id').post((req, res) => {
	Recruiter.findById(req.params._id)
		.then(recruiter => {
            recruiter.contact = +Number(req.body.contact);
            recruiter.bio = req.body.bio;
			recruiter.save()
                .then(() => res.json('Profile updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
	  })
	  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;