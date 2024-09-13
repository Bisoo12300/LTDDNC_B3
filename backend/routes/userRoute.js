const express = require('express');

const {
    signUp,
    updateUser,
    deleteUser
} = require('../controllers/userController'); // Đảm bảo đường dẫn chính xác đến userController
const { sign } = require('jsonwebtoken');

const router = express.Router();

// Sign up a new user
router.post('/signup', signUp);

// Update a user by ID
router.put('/:uid', updateUser);

// Delete a user by ID
router.delete('/:uid', deleteUser);

module.exports = router;
