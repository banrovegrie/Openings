const router = require('express').Router();
let Job = require('../models/job.model');

// Get all jobs
router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add job (by recruiter)
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
	//const total_rating = +Number(req.body.total_rating);
	//const total_number_of_ratings = +Number(req.body.total_number_of_ratings);

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
		salary
	});

    newJob.save()
	    .then(() => res.json('Job added!'))
	    .catch(err => res.status(400).json('Error: ' + err));
});

// Get job for a given id
router.route('/:_id').get((req, res) => {
	Job.findById(req.params._id)
	  .then(job => res.json(job))
	  .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Job (by recruiter)
router.route('/:_id').delete((req, res) => {
	Job.findByIdAndDelete(req.params._id)
		.then(() => res.json('Job deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});

// Update updatable job details (by recruiter)
router.route('/update/:_id').post((req, res) => {
	Job.findById(req.params._id)
		.then(job => {
			job.max_number_of_applications = req.body.max_number_of_applications;
			job.max_number_of_positions = req.body.max_number_of_positions;
			job.deadline = Date.parse(req.body.deadline);
			job.save()
				.then(() => res.json('Job updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
	  })
	  .catch(err => res.status(400).json('Error: ' + err));
});

// Update job rating (by applicant)
router.route('/rating/update/:_id').post((req, res) => {
	Job.findById(req.params._id)
		.then(job => {
			job.total_rating = req.body.total_rating;
			job.total_number_of_ratings = req.body.total_number_of_ratings;
			job.save()
				.then(() => res.json('Job updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// Add an application (by applicant)
/*
{
	"id": "---",
	"name": "---",
	"email": "---",
	"SOP": "---"
}
*/
router.route('/apply/:_id').post((req, res) => {
	Job.findById(req.params._id)
		.then(job => {
			const application = {
				id: req.body.id,
				name: req.body.name,
				email: req.body.email,
				SOP: req.body.SOP,
				status: "Applied"
			};
			job.applications.push(application);
			job.save()
				.then(() => res.json('Application submitted!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// Update status of a given application (by recruiter)
/*
{
	"status": "---"
}
*/
router.route('/update/status/:_id/:applications_id').post((req, res) => {
	Job.findById(req.params._id)
		.then(job => {
			job.applications.forEach(application => {
				if (application.id === req.params.applications_id) {
					application.status = req.body.status;
				}
			});
			job.save()
				.then(() => res.json('Status updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;