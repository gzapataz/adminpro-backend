/*
  This file is the route for the users endpoint
  Route /api/login
*/

const Router = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validations');


const { login } = require('../controllers/auth.controller')

const router = Router();

router.post('/',
  [
    check('email', 'email is mandatory').notEmpty(),
    check('email', 'invalid email').isEmail(),
    check('password', 'The password is required').isLength({ min: 6 }),
    fieldValidation
  ], login);

module.exports = router;
