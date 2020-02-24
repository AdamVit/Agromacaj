require('dotenv').config();

const express = require('express'),
	  nodemailer = require("nodemailer"),
	  bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => res.render('homePage', {scroll: "page"}));

app.get('/contacts', (req, res) => res.render('contact', {scroll: "page2"}));

app.post('/contacts', (req, res) => {
	let transporter = nodemailer.createTransport({
		host: "smtp-relay.sendinblue.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'avitek123@gmail.com',
			pass: process.env.PASS
		}
	});
	try {
		transporter.sendMail({
			from: req.body.email,
			to: 'avitek123@gmail.com',
			subject: req.body.subject,
			text: req.body.description + '\n\n' + req.body.name
		});
	} catch(err) {
		console.log(err.message);
	};
	return res.redirect('/contacts');
});

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`));