/*
  This file is the route for the users endpoint
  Route /api/users
*/

const Router = require('express');
const { getUsers, createUsers, deleteUser, updateUser } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validations');
const { validateJwt } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', validateJwt, getUsers);
router.post('/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').isLength({ min: 6 }),
    fieldValidation
  ],
  createUsers);

router.put('/:id',
  [
    validateJwt,
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('role', 'Role es obligatorio').not().isEmpty(),
    fieldValidation,
  ], updateUser);

router.delete('/:id', validateJwt, deleteUser);
module.exports = router;  
