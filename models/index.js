const User = require('./User');
const Comment = require('./Comment');
const Take = require('./Take');
const Pick = require('./Pick');

User.hasMany(Take, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Take.belongsTo(User, {
  foreignKey: 'user_id'
});
Take.hasMany(Comment, {
  foreignKey: 'take_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Take, {
  foreignKey: 'take_id'
});
Take.hasMany(Pick, {
  foreignKey: 'take_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(Take, {
  foreignKey: 'take_id'
});





module.exports = { User, Take, Comment, Pick };
