const router = require('express').Router();
let Recruiter = require('../models/recruiter.model');

router.route('/').get((req, res) => {
    Recruiter.find()
        .then(recruiters => res.json(recruiters))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = +Number(req.body.contact);
    const bio = req.body.bio;

	const newRecruiter = new Recruiter({
        name,
        email,
        contact,
        bio
	});

    newRecruiter.save()
	    .then(() => res.json('Recruiter added!'))
	    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;