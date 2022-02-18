const sequelize = require('../config/connection');
const { Users, Takes, Comment, Pick } = require('../models');

const userData = require('./userData.json');
const takeData = require('./takeData.json');
const commentData = require('./commentData.json');
const pickData = require('./pickData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });



  const take = await Takes.bulkCreate(takeData);
  const comment = await Comment.bulkCreate(commentData);
  const pick = await Pick.bulkCreate(pickData);



  process.exit(0);
};

seedDatabase();
