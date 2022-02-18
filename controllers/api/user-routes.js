const router = require('express').Router();

const bcrypt = require('bcrypt');
const fs = require('fs');
const util = require('util');
const unlinkFile= util.promisify(fs.unlink)
const { normalize } = require('path')
const { uploadFile, getFileStream } = require('../../public/js/s3')
const multer = require('multer');
const withAuth = require('../../utils/auth');
const req = require('express/lib/request');
const { Takes, Users, Comment, Pick } = require('../../models');


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
router.get('/post', withAuth, async (req, res) => {
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
// router.get('/:id', async (req, res) => {
// 	const idUser = await Users.findOne({
// 		where: {
// 			id: req.params.id,
// 		},
// 	});

// 	!idUser
// 		? res.status(404).json({ message: 'No User with that ID' })
// 		: res.status(200).json(idUser);
// });

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



// Login in current User, check database if exist.

router.post('/login', async (req, res) => {
	
	try {
		const userData = await Users.findOne({		
			where: {
				email: req.body.email,
			},
		});


		if (!userData) {
			res
			  .status(400)
			  .json({ message: 'Incorrect email or password, please try again' });
			return;
		  }

		  const validPassword = await userData.checkPassword(req.body.password);

		  if (!validPassword) {
			res
			  .status(400)
			  .json({ message: 'Incorrect email or password, please try again' });
			return;
		  }
	  

		  req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.logged_in = true;
			
			res.json({ user: userData, message: 'You are now logged in!' });
		  });
	  
		} catch (err) {
		  res.status(400).json(err);
		}
	  });


router.post('/register', async (req, res) => {

	try {
		const userData = await Users.create(req.body);
		
	
		// change from is member
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.logged_in = true;
			
			res.status(200).json(userData);	 	
		});
		 
		
		// const cleanUser = dbUserData.get({ plain: true });

		// if (!cleanUser) {
		// 	return res.status(404).json({ message: 'Email or password taken' });
		// }
		// req.session.save(() => {
		// 	req.session.member = true
		// 	// req.session.user_id = dbUserData.id;
      	// 	// req.session.username = dbUserData.username;
			
		
	
	} catch (err) {
		res.status(500).json(err);
	}
});


router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
	  req.session.destroy(() => {
		res.status(204).end();
	  });
	} else {
	  res.status(404).end();
	}
  });




// Recieve new post and persist the data into the database.
// router.post('/post',withAuth, async (req, res) => {
//     const newPost = await Takes.create({

// 		...req.body,
// 		// user_id: req.session.user_id,
// 		user_id: 1,
// 		category: "random",

//     })

//     res.status(200).json(newPost)
// });


router.post('/post', async (req, res) => {
	try {
	const makePost = await Takes.create({
		 
		  ...req.body,
		  user_id: req.session.user_id,
		  category: "random",
   
	  })
  
	  let newPost = makePost.get({ plain: true });
  
	  const newPick = await Pick.create({
		// ...req.body,
		// user_id: req.session.user_id,
		user_id: newPost.user_id,
		take_id: newPost.id,
	  });
  
	 res.json(200, (newPost, newPick))
	} catch (err) {
	  res.status(400).json(err);
	}
  })







// Post route for accepting uploads to site.

router.post('/uploads', upload.single('profile-file'),  async(req, res, next) => {
	// req.file is the `profile-file` file
	// req.body will hold the text fields, if there were any
	// dbProfilePic = await picUsers.create({
	// 	profile_pic: req.file.path
	// });
	const file = req.file
	console.log("Path:",req.file.path)
	const result = await uploadFile(file)
	await unlinkFile(file.path)
	console.log(result)
	let response = '<a href="/">Home</a><br>'
	response += "Files uploaded successfully.<br>"
	response += `<img class=""src="${req.file.path}" /><br>`
	return res.send({imagePath: `/uploads/${result.Key}`})
  });

  


  // pick route
router.post('/pick', withAuth, async (req, res) => {
	try {
	  const newPick = await Pick.create({
		...req.body,
		user_id: req.session.user_id,
		
	  });
  
	  res.status(200).json(newPick);
  
	} catch (err) {
	  res.status(400).json(err);
	}
  });
  
  // comment route
  
  router.post('/comment', withAuth, async (req, res) => {
  
	try {
	  const newProject = await Comment.create({
  
		...req.body,
		// user_name: "Chuck",
		user_id: req.session.user_id,
	  });
  
	  res.status(200).json(newProject);
	} catch (err) {
	  res.status(400).json(err);
	}
  });
  


  router.get('/takelikes', async (req, res) => {
	try {
	  // Get all projects and JOIN with user data
	  const projectData = await Takes.findAll({
  
		attributes: ["title"],
		include: [
		  {
			model: Pick,
			attributes: ["user_id", "take_id" ]
		  },
		],
	  });
  
	  // Serialize data so the template can read it
	  const projects = projectData.map((project) => project.get({ plain: true }));
  
	let take = []
	// let lenght = []
	projects.forEach(item => {
  
	  let num = item.picks.length
	  take.push ({"title":item.title, "likes" : num})
	  
	});
  
	  res.send (take);
  
	} catch (err) {
	  res.status(500).json(err);
	}
  });
  
  
  // route to show people who like the same thinngs you do
  router.get('/connects/:id', async (req, res) => {
	try {
	  const projectData = await Users.findByPk( req.params.id, {
  
		attributes: ["id",'username'],
		include: [
		  {
			model: Pick,
			attributes: ["take_id"],
		  },
		],
	  });
  
	  let projects = projectData.get({ plain: true });
  
	  // array for user picks
	  let myPicks = []
  
	  // username
	  let myName = projects.username
  
	  // creating a array with only the users picks
	   projects.picks.forEach(item => { myPicks.push (item.take_id)
  
		
	  });
  
		// Get all users and picks
	   const pullData = await Users.findAll({
  
		attributes: ["id",'username'],
		include: [
		  {
			model: Pick,
			attributes: ["take_id"],
		  },
		],
	  });
  
	  // Clean data up so it's easier to work with
	  const allData = pullData.map((project) => project.get({ plain: true }));
	
	  // create array to hold people that made the same picks as you
		let matches = []
  
		// iterate through all users
		allData.forEach(user => { 
		  let test = 0
		  let take =[]
		  // if the names of the users don't match continue
		  if (user.username !== myName) {
  
			// iterate through my picks
			myPicks.forEach(item =>{
  
			  // iterate through current users picks
			   for (let i = 0; i < user.picks.length; i++) {
  
			if (item === user.picks[i].take_id) {
			  // test.push (user.user_name)
			  test++
			  take.push (item)
			  i = user.picks.length
			}
			}
		  })
  
		  }
		  // if myself and the user has atleast a certain about of picks in common then add to matches
		  if (test >= 1) {
			matches.push ({"username" : user.username, "take": take})
		  }
		});
	// send the matches
	  res.send (matches);
	
	} catch (err) {
	  res.status(500).json(err);
	}
  });
  
  
  
  router.get('/takecomments', async (req, res) => {
	try {
	  // Get all projects and JOIN with user data
	  const projectData = await Takes.findAll({
  
		attributes: ["title", "description"],
		include: [
		
		  {
			model: Comment,
			attributes: ["user_id", "text"],
		  },
		],
	   
	  });
  
	  // Serialize data so the template can read it
	  const projects = projectData.map((project) => project.get({ plain: true }));
  
	  res.send (projects);
	  
	} catch (err) {
	  res.status(500).json(err);
	}
  });
  

module.exports = router;
