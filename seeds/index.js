const sequelize = require('../config/connection');
const { Post } = require('../models');
const postData = require('./postData');



const seedAll = async () => {
  try {
    await sequelize.authenticate(); // Check if the connection is working

    await sequelize.sync({ force: true });

    // Seed Post data
    for (const post of postData) {
      await Post.create(post);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedAll();
