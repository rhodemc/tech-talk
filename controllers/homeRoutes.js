// Initialize express router and require the necessary models
const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogposts for homepage and join with user data
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [{ User }],
    });

    const blogPosts = blogData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('home', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all blogposts for dashboard by logged in user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ User }],
    });

    const blogPosts = blogData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('dashboard', {
      blogPosts,
      // url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET createblogpost page
router.get('/createblogpost', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render('createblogpost', {
      user,
      // url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET updateblogpost page
router.get('/updateblogpost/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);
    const blogPost = blogData.get({ plain: true });
    // console.log(blogPost);
    res.render('updateblogpost', {
      blogPost,
      // url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET blogpost by id
router.get('/blogpost/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [{ User, Comment }],
    });

    const blogPost = blogData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: {
        blogpost_id: req.params.id,
      },
      include: [{ User, BlogPost }],
    });
    comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('blogpost', {
      blogPost,
      comments,
      // url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET signup page
// potentially dig into this a little more
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
