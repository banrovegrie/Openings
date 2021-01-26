const router = require('express').Router();
let Recruiter = require('../models/recruiter.model');
const nodemailer = require('nodemailer');

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

// Get recruiter for a given id
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

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "gibjob0801@gmail.com",
      pass: "jobisgiben",
    },
    tls: {
      rejectUnauthorized: false
    }
});

router.route('/mail').post((req, res) => {
    const output = `<h1>Congrats! </h1><br>
    <h3>${req.body.name} recruiter accepted your application.</h3>`
  
    transporter.sendMail({
        from: '"Openings" <gibjob0801@gmail.com>', 
        to: `${req.body.email}`,
        subject: "Letter of Acceptance", 
        text: "Happy Happy",
        html: output,
    })
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, message: err.message }));
});

module.exports = router;