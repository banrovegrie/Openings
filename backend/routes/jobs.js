const router = require('express').Router();
let Job = require('../models/job.model');

router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const title = req.body.title;
	const id = req.body.recruiter.id;
	const name = req.body.recruiter.name;
	const email = req.body.recruiter.email;
	const max_number_of_applications = +Number(req.body.max_number_of_applications);
	const max_number_of_positions = +Number(req.body.max_number_of_positions);
	const deadline = Date.parse(req.body.deadline); 
	const skills = req.body.skills; // parse using for loop
	const type_of_job = req.body.type_of_job;
	const duration = +Number(req.body.duration);
	const salary = +Number(req.body.salary);
	const total_rating = +Number(req.body.total_rating);
	const total_number_of_ratings = +Number(req.body.total_number_of_ratings);

	const newJob = new Job({
		title,
		recruiter: 
		{
			id,
			name, 
			email
		},
		max_number_of_applications,
		max_number_of_positions,
		deadline,
		skills,
		type_of_job,
		duration,
		salary,
		total_rating,
		total_number_of_ratings
	});

    newJob.save()
	    .then(() => res.json('Job added!'))
	    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;