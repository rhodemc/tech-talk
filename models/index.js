const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

// foreign key here might not work, check back later
BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogpost_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, BlogPost, Comment };
