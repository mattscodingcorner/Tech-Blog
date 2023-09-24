const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('./utils/auth'); 


// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'name', 'time_commented', 'content'],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log('postData:', postData);
    console.log('posts:', posts);

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const { BlogPost } = require('../models');

// ...

router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch blog posts from the database
    const blogPostsData = await BlogPost.findAll({
      order: [['createdAt', 'DESC']], // Order by creation date, for example
    });

    const blogPosts = blogPostsData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      users,
      blogPosts, // Pass blog posts to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
