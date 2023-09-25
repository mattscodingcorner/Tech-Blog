const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth'); 

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Fetch data from both models
    const postData = await Post.findAll({
      attributes: ['id', 'name', 'time_commented', 'content'],
    });

    // Map the data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts);


    // Render the homepage template with both sets of data
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    console.log(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const renderPosts = (posts) => {
  const postList = document.querySelector('#postData');
  postList.innerHTML = '';

  posts.forEach(post => {
    const postItem = document.createElement('div');
    postItem.innerHTML = `
      <h2>${post.name}</h2>
      <p>${post.content}</p>
      <p>${post.time_commented}</p>
    `;
    postList.appendChild(postItem);
  });
};


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;