const router = require('express').Router();
// const Takes = require('../models/Takes.js');
const { Takes, Users, Comment, Pick } = require('../models');
const withAuth = require('../utils/auth');

// Render the Main page of Takes.
router.get('/', async (req, res) => {
	req.session.save(() => {
		req.session.countVisit ? req.session.countVisit++ :
		req.session.countVisit = 1
	})
	try {
		const dbTakesData = await Takes.findAll({
			include: [
				{
				  model: Users,
				  attributes: ['username'],
				},
				{
				  model: Comment,
				  attributes: ['text'],
				},
			  ],
		});

		const theTakes = dbTakesData.map((blog) => blog.get({ plain: true }));
		// console.log('The Takes:', theTakes[0].title);


		// res.send(theTakes);

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
	
		}
		);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render Login page.
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	  }
	
	  res.render('login');
	});


// Render profile page when the user is signed in and clicks loge.

router.get('/profile', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await Users.findByPk(req.session.user_id, {
		  attributes: { exclude: ['password'] },
		  include: [{ model: Takes }],
		});
	
		const user = userData.get({ plain: true });
	
		res.render('profile', {
		  ...user,
		  logged_in: true
		});
	  } catch (err) {
		res.status(500).json(err);
	  }
	});


module.exports = router;
