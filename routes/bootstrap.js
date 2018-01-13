/**
 * bootstrap.js
 * 
 * The routes starting with {HOST}/api/bootstrap.
 */

const router = require('express').Router();
const bootstrapController = require('../controllers/bootstrapController');
const auth = require('../middlewares/authentication');
const roles = require('../middlewares/roles');


/**
 * Uses authentication middlewares.
 */
router.use('/', auth.handleToken, roles.requireRoles(['admin']));

/**
 * GET /api/bootstrap/generate
 */
router.get('/generate', bootstrapController.generate);


module.exports = router;
