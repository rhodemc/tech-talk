// this file will be used to collect the packaged group of API endpoints
// and prefix them with the path /api

// import all API routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogPostRoutes');

router.use('/users', userRoutes);
router.use('/posts', blogPostRoutes);

module.exports = router;
