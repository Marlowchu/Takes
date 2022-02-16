const router = require('express').Router();
const Takes = require('../models/Takes.js');

// Render the Main page of Takes.
router.get('/', async (req, res) => {
	req.session.save(() => {
		req.session.countVisit ? req.session.countVisit++ :
		req.session.countVisit = 1
	})
	try {
		const dbTakesData = await Takes.findAll({});

		const theTakes = dbTakesData.map((blog) => blog.get({ plain: true }));
		// console.log('The Takes:', theTakes[0].title);

		res.render('homepage', {
			theTakes,
			countVisit: req.session.countVisit,
			isMember: req.session.member
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render registration page.
router.get('/register', async (req, res) => {
	try {
		res.render('register', {
			isMember: req.session.member
		}
		);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render Login page.
router.get('/login', async (req, res) => {
	req.session.member ? res.redirect('/') :
	res.render('login')
	try {
		res.render('login');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});


// Render profile page when the user is signed in and clicks loge.

router.get('/profile', async (req, res) => {
	try {
		res.render('profile', {
			isMember: req.session.member,
			theUser: req.session.userInfo 
		}
		);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});



module.exports = router;
