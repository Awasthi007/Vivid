const express = require('express');

const router = express.Router();
const home_controller = require('../controllers/home_controller');

console.log('router loaded');
router.get('/', home_controller.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));

// for any of the futher routes we can use the following syntax
// router.use('./routerName', require('./routerfile));

module.exports = router;
