// Initialize express router and require the necessary models
const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogposts and join with user data
router.get('/', async (req, res) => {
  try {
    let blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    blogData = blogData.map((blogpost) => blogpost.get({ plain: true }));

    console.log(blogData);

    res.render('homepage', {
      blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all blogposts for dashboard by logged in user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    let blogData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    blogData = blogData.map((blogpost) => blogpost.get({ plain: true }));

    res.render('dashboard', {
      blogData,
      url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET createpost page
router.get('/createpost', withAuth, async (req, res) => {
  try {
    let userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    userData = userData.get({ plain: true });
    res.render('createpost', {
      userData,
      url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET editpost page
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    let blogData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          model: Comment,
        },
      ],
    });
    blogData = blogData.get({ plain: true });
    console.log(blogData);
    res.render('editpost', {
      blogData,
      url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET blogpost by id
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    let blogData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          model: Comment,
        },
      ],
    });

    blogData = blogData.get({ plain: true });

    let commentData = await Comment.findAll({
      where: {
        blogpost_id: req.params.id,
      },
      include: [
        {
          model: User,
          model: BlogPost,
        },
      ],
    });
    commentData = commentData.map((comment) => comment.get({ plain: true }));

    res.render('post', {
      blogData,
      commentData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: BlogPost }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('dashboard', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
// router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in === true) {
  //   res.redirect('/dashboard');
  //   return;
  // }

  // res.render('signup');
// });

module.exports = router;
