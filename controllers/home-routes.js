const router = require('express').Router();
const { Post } = require('../models');


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


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
