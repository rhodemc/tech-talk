// index.js is the central hub for all routing files
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// set up router middleware
router.use('/api', apiRoutes);
router.use(homeRoutes);

// export the router
module.exports = router;
