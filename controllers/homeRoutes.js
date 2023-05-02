// Initialize express router and require the necessary models
const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogposts for homepage and join with user data
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
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

//
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
