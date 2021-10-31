const sequelize = require('../config/connection');
const { User, Project,Comments } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  

  for (const project of projectData) {
    await Project.create({
      ...project,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const projects = await Project.bulkCreate(projectData, {
    individualHooks: true,
    returning: true,
  });

  for (const comments of commentData) {
    await Comments.create({
      ...comments,
      // project_id: projects[Math.floor(Math.random() * projects.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();