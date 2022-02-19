const router = require("express").Router();
const takeUsers = require("../../models/takeUsers.js");
const Takes = require("../../models/Takes.js");
const bcrypt = require("bcrypt");

// Get all Users from the database.

// Get User by Id
router.get("/:id", async (req, res) => {
  const idUser = await takeUsers.findOne({
    where: {
      id: req.params.id,
    },
  });

  !idUser
    ? res.status(404).json({ message: "No User with that ID" })
    : res.status(200).json(idUser);
});

// Hierachy Route

router.get("/:id", async (req, res) => {
  const idUser = await takeUsers.findOne({
    where: {
      id: req.params.id,
    },
  });

  req.session.save(() => {
    req.session.countVisit
      ? req.session.countVisit++
      : (req.session.countVisit = 1);
  });
  const btn = document.querySelector(".addbutton");
  let count = 0;

  btn.addEventListener("click", () => {
    req.session.countVisit;
    console.log(countVisits);

    const target = document.querySelector(".hierarchyPics");

    switch (req.session.countVisit) {
      case 1:
      case 2:
        console.log("Fan Ranking");
        image = `<img src="./img/fan_image.png">`;

        target.innerHTML = image;
        // target= InnerHtml="<img>Icon</img>"
        break;
      case 3:
      case 4:
        // case 5:
        console.log("Member Ranking");

        image = `<img src="./img/member_image.jpeg">`;
        target.innerHTML = image;
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case 5:
      case 6:
        // case 7:
        console.log("Rising Star Ranking");
        image = `<img src="./img/Rising_star.png">`;

        target.innerHTML = image;
        break;
      case 7:
      case 8:
        console.log("Influencer Ranking");
        image = `<img src="./img/influencer_image.png">`;

        target.innerHTML = image;
        break;
      case 9:
      case 10:
        console.log("All Access Ranking");
        image = `<img src="./img/all_access_image.png">`;

        target.innerHTML = image;
      default:
        console.log(`All Access Ranking`);
    }
  });
});

// Delete User by Id
router.delete("/:id", async (req, res) => {
  const delUser = await takeUsers.destroy({
    where: {
      id: req.params.id,
    },
  });

  !delUser
    ? res.status(404).json({ message: "No User with that ID" })
    : res.status(200).json({ message: `You deleted User ${req.params.id}` });
});

// Register new user to Takes site!

router.post("/register", async (req, res) => {
  // const { username, email, password} = req.body
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const dbUserData = await takeUsers.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const cleanUser = dbUserData.get({ plain: true });
    res.status(200).json(cleanUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login in current User, check database if exist.

router.post("/login", async (req, res) => {
  try {
    const userExist = await takeUsers.findOne({
      where: {
        email: req.body.email,
      },
    });
    const cleanUserLogin = await userExist.get({ plain: true });

    if (!cleanUserLogin) {
      return res.status(404);
    }

    const validPass = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!validPass) {
      return res.status(400);
    }
    return res.status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Recieve new post and persist the data into the database.
router.post("/post", async (req, res) => {
  const newPost = await Takes.create({
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json(newPost);
});

module.exports = router;
