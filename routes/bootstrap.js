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
router.use('/', 
    auth.handleToken,
    roles.requireRoles(['admin']));

/**
 * POST /api/bootstrap/generate
 */
router.post('/generate', 
    auth.getMedicinesManagementToken,
    auth.getAuth0Token,
    bootstrapController.generate);

/**
 * DELETE /api/bootstrap/documents
 */
router.delete('/documents', bootstrapController.deleteDocuments);


module.exports = router;
