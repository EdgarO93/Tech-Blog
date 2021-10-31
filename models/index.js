const User = require('./User');
const Project = require('./Project');
const Comments = require('./Comments');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Comments.belongsTo(Project, {
  foreignKey: 'project_id',
  onDelete: "cascade"
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Project.hasMany(Comments, {
  foreignKey: 'project_id',
  onDelete: "cascade"
})

module.exports = { User, Project,Comments };
