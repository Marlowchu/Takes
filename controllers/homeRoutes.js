const router = require('express').Router();
const { pick } = require('lodash');
const { Take, User, Comment, Pick } = require('../models');
// const withAuth = require('../utils/auth');


router.get('/test', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await User.findAll({

      attributes: ["id",'user_name'],
      include: [
        // {
        //   model: Take,
        //   // attributes: ['user_name'],
        // },
        // {
        //   model: Comment,
        //   // attributes: ['name', 'text'],
        // },
        {
          model: Pick,
          attributes: ["take_id"],
        },
      ],
      // [{ model: Category},{ model: Tag}],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));


    res.send (projects);
    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});



// route to show people who like the same thinngs you do
router.get('/connect/:id', async (req, res) => {
  try {
    const projectData = await User.findByPk( req.params.id, {

      attributes: ["id",'user_name'],
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
    let myName = projects.user_name

    // creating a array with only the users picks
     projects.picks.forEach(item => { myPicks.push (item.take_id)

   
   
      
    });

   
      // Get all users and picks
     const pullData = await User.findAll({

      attributes: ["id",'user_name'],
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
        if (user.user_name !== myName) {

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

         

              // if my pick matches the current user pick return the user name and the take we liked
              // if (item === user.picks[i].take_id) {
              //   matches.push (user.user_name, user.picks[i])
              // }
          }

        

        })

        }
        // if myself and the user has atleast a certain about of picks in common then add to matches
        if (test >= 3) {
          matches.push (user.user_name, take)
        }

      });
  // send the matches
    res.send (matches);
  
  } catch (err) {
    res.status(500).json(err);
  }
});








router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const categoriesData = await User.findByPk(req.params.id, {
      
      include: [{ model: Pick}],
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'id not found' });
      return;
    
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

