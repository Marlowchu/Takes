const router = require('express').Router();
const { Take, User, Pick, Comment } = require('../../models');








// Get all Users from the database.

router.get('/', async (req, res) => {
	const allUsers = await User.findAll({});

	res.status(200).json(allUsers);
});

// Get User by Id
router.get('/:id', async (req, res) => {
	const idUser = await User.findOne({
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
	const delUser = await User.destroy({
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
		// const dbUserData = await User.create({
			// username: req.body.username,
			// email: req.body.email,
			// password: hashedPassword,
      const userData = await User.create(req.body);

      // req.session.save(() => {
      //   req.session.user_id = userData.id;
      //   req.session.logged_in = true;
  
      //   res.status(200).json(userData);

		
		const cleanUser = userData.get({ plain: true });
		res.status(200).json(cleanUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login in current User, check database if exist.

router.post('/login', async (req, res) => {
	try {
		const userExist = await User.findOne({
			where: {
				email: req.body,
			},
		});
		const cleanUserLogin = await userExist.get({ plain: true });

		if (!cleanUserLogin) {
			return res.status(404).json({ message: 'Email or password incorrect' });
		}
		res.status(200);

		const validPass = await bcrypt.compare(
			req.body.password,
			userExist.password
		);
		if (!validPass) {
			return res.status(400).send('Invalid Password');
		}
		return res.status(200).json({ message: 'Welcome!' });
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Recieve new post and persist the data into the database.
router.post('/post', async (req, res) => {
  try {
  const makePost = await Take.create({
        // title: req.body.title,
        // description: req.body.description,

        ...req.body,
        // once login maid sessions should work and give the user id
        // user_id: req.session.user_id,
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











// beginning of chuck ...


// pick route
router.post('/pick', async (req, res) => {
  try {
    const newPick = await Pick.create({
      ...req.body,
      // user_id: req.session.user_id,
      user_id: 2,
      // take_id: req.params.id,
    });

    res.status(200).json(newPick);

  } catch (err) {
    res.status(400).json(err);
  }
});

// comment route

router.post('/comment', async (req, res) => {
// router.post('/comment', withAuth, async (req, res) => {
  try {
    const newProject = await Comment.create({

      text: req.body.text,
      take_id: req.body.take_id,
      user_name: "Chuck",
      // user_id: 1,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});







router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

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
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
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

module.exports = router;
