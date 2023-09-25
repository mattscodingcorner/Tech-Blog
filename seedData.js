const sequelize = require('./config/connection');
const Post = require('../models/Post');
const postData = require('./seeds/postData');

(async () => {
  await sequelize.sync({ force: true }); // This will drop and recreate the table
  
  try {
    await Post.bulkCreate(postData);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    sequelize.close();
  }
})();
