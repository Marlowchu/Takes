const sequelize = require('../config/connection');
const { User, Take, Comment, Pick } = require('../models');

const userData = require('./userData.json');
const takeData = require('./takeData.json');
const commentData = require('./commentData.json');
const pickData = require('./pickData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });



  const take = await Take.bulkCreate(takeData);
  const comment = await Comment.bulkCreate(commentData);
  const pick = await Pick.bulkCreate(pickData);


  // for (const take of takeData) {
  //   await Take.create({
  //     ...take,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }


  

  // for (const { id } of drivers) {
  //   // Need to include a valid driver_id when creating a license
  //   const newLicense = await License.create({
  //     driver_id: id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
