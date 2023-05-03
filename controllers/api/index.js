// this file will be used to collect the packaged group of API endpoints
// and prefix them with the path /api

// import all API routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

// q code can't access user routes, why?
// a need to export the router in userRoutes.js
router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
