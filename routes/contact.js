var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
	var transporter = nodeMailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'scottkuchinski@gmail.com',
			pass: 'nospaces'
		}
	});

	var mailOptions = {
		from: 'John Doe <johndoe@outlook.com>',
		to: 'techguyinfo@gmail.com',
		subject: 'Website Submission',
		text: 'You have a new submission with the following details...Name: '+req.body.name+ ' Email: '+req.body.email+ ' Message: '+req.body.message,
		html: '<p>Check it out</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
