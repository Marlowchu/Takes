const User = require('./User');
const Comment = require('./Comment');
const Takes = require('./Takes');
const Pick = require('./Pick');
const { pick } = require('lodash');

User.hasMany(Pick, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(User, {
  // foreignKey: 'user_id'
});

Takes.hasMany(Pick, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(Takes, {
  // foreignKey: 'user_id'
});


Takes.hasMany(Comment, {
  // foreignKey: 'take_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Takes, {
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



module.exports = { User, Takes, Comment, Pick };
