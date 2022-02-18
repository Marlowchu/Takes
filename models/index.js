const User = require('./User');
const Comment = require('./Comment');
const Take = require('./Take');
const Pick = require('./Pick');
const { pick } = require('lodash');

User.hasMany(Pick, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(User, {
  // foreignKey: 'user_id'
});

Take.hasMany(Pick, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(Take, {
  // foreignKey: 'user_id'
});


Take.hasMany(Comment, {
  // foreignKey: 'take_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Take, {
  // foreignKey: 'take_id'
});
// Take.hasMany(Pick, {
//   foreignKey: 'take_id',
//   onDelete: 'CASCADE'
// });

// Pick.belongsTo(Take, {
//   foreignKey: 'take_id'
// });

// User.hasMany(Pick, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Pick.belongsTo(User, {
//   foreignKey: 'user_id'
// });


// User.belongsToMany(Take, {
//   through:{
//     model:Pick,
//     unique: false, 
//   }
// });


// Take.belongsToMany(User, {
//   through:{
//     model:Pick,
//     unique: false, 
//   }
// });

// User.belongsToMany(Take, {
//   through:{
//     model:Pick,
//     unique: false, 
//   }
// });



module.exports = { User, Take, Comment, Pick };
