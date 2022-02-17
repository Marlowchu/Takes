const router = require('express').Router();
const { Takes, Users, Comment, Pick } = require('../../models');
// deprecated code v
// const takeUsers = require('../../models/takeUsers.js');
// const Takes = require('../../models/Takes.js');
const picUsers = require('../../models/picUsers.js')
const bcrypt = require('bcrypt');
const fs = require('fs');
const util = require('util');
const unlinkFile= util.promisify(fs.unlink)
const { normalize } = require('path')
const { uploadFile, getFileStream } = require('../../public/js/s3')
const multer = require('multer');


let storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      
      cb(null, normalize('public/uploads/'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
});

const theFilter = (req, file, cb) => {
	file.mimetype === 'image/jpeg' || file.mimetype === 'image.png' ?
	cb(null, true) : cb(null, false);
}

let upload = multer({ storage, limits: {
	fileSize: 1024* 1024 * 5
} ,
	theFilter
});

// Get all Profile pics from database.
router.get('/uploads/:key', async (req, res) => {
	const key = req.params.key
	const readstream = getFileStream(key)

	readstream.pipe(res)
	// const theUsersPic = await picUsers.findAll({
		
	// }); 
	// req.session.member ? res.redirect('/profile') :
	// res.render('profile')

	res.status(200).json(key);
});

// Get Profile pics from database by Id.
// router.get('/uploads/:id', async (req, res) => {
// 	const theUsersPic = await picUsers.findOne({
// 		where: {
// 			id: req.params.id
// 		}
		
// 	});

// 	res.status(200).json(theUsersPic);
// });

// Get route to retrieve all post from database.
router.get('/post', async (req, res) => {
    const newPost = await Takes.findAll({
        
    });

    res.status(200).json(newPost)
});


// Get all Users from the database.

router.get('/', async (req, res) => {
	const allUsers = await Users.findAll({
		
		
	});

	res.status(200).json(allUsers);
});

// Get User by Id
router.get('/:id', async (req, res) => {
	const idUser = await Users.findOne({
		where: {
			id: req.params.id,
		},
	});

	!idUser
		? res.status(404).json({ message: 'No User with that ID' })
		: res.status(200).json(idUser);
});

// Delete User by Id
router.delete('/:id', async (req, res) => {
	const delUser = await Users.destroy({
		where: {
			id: req.params.id,
		},
	});

	!delUser
		? res.status(404).json({ message: 'No User with that ID' })
		: res.status(200).json({message: `You deleted User ${req.params.id}`});
});

// Register new user to Takes site!

router.post('/register', async (req, res) => {
	
	// const { username, email, password} = req.body
	// const hashedPassword = await bcrypt.hash(req.body.password, 10);

	try {
		const dbUserData = await Users.create(req.body);
		const cleanUser = dbUserData.get({ plain: true });
		req.session.save(() => {
			req.session.member = true
			req.session.user_id = cleanUser.id;
      		req.session.username = cleanUser.username;
			 	
		});
		

		if (!cleanUser) {
			return res.status(404).json({ message: 'Email or password taken' });
		}
		 
		res.status(200).json(cleanUser);
		
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login in current User, check database if exist.

router.post('/login', async (req, res) => {
	
	try {
		const userExist = await Users.findOne({	
				
			where: {
				email: req.body.email,
			},
		});
		const cleanUserLogin = await userExist.get({ plain: true });

		if (!cleanUserLogin) {
			return res.status(404).json({ message: 'Email or password incorrect' });
		}
		req.session.save(() => {
			req.session.member = true
			req.session.theName = cleanUserLogin.username
			req.session.theEmail = cleanUserLogin.email
			req.session.profilePic = cleanUserLogin.profile_pic
			
			
			
		});
		
		res.status(200);

		const validPass = await bcrypt.compare(
			req.body.password,
			userExist.password
		);
		if (!validPass) {
			return res.status(400).send('Invalid Email or Password');
		}
		return res.status(200).json({ message: 'Welcome!' });
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Recieve new post and persist the data into the database.
router.post('/post', async (req, res) => {
    const newPost = await Takes.create({
        title: req.body.title,
        description: req.body.description
    })

    res.status(200).json(newPost)
});


// Post route for accepting uploads to site.

router.post('/uploads', upload.single('profile-file'),  async(req, res, next) => {
	// req.file is the `profile-file` file
	// req.body will hold the text fields, if there were any
	const file = req.file
	console.log("Path:",req.file.path)
	const result = await uploadFile(file)
	const thePicture = await result.Location
	req.session.save(() => {
		req.session.profilePic = thePicture
	});
	await unlinkFile(file.path)
	dbProfilePic = await Users.update({
		profile_pic: thePicture},
		{
			where: {
			email: req.session.theEmail,
		},
		
		});
	let response = '<a href="/profile">Profile</a><br>'
	response += "Files uploaded successfully.<br>"
	response += `<img class=""src="${result.Location}" /><br>`
	return res.send(response)
  });

// Function to logout the User and destroy session.
router.post('/logout', (req, res) => {
	if (req.session.member) {
	  req.session.destroy(() => {
		res.status(204).end();
	  });
	} else {
	  res.status(404).end();
	}
  });
  

module.exports = router;
