const { check } = require('express-validator');

exports.validateRegister = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('phone', 'Phone must be 10 digits')
    .optional()
    .isLength({ min: 10, max: 10 }),
  check('country', 'Country is required').notEmpty(),
];

exports.validateLogin = [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists(),
];
