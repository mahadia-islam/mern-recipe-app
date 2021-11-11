const express = require('express');
const router = express.Router();

// CONTROLLER

const { getUser, addUser, findUserById, updateUser, deleteUser, doLogin, doLogout } = require('./../controllers/userController');
const { avatarUpload } = require('./../middleware/user/avatarUpload');
const { checkLogin } = require('./../middleware/user/checkLogin');

// GET USER

router.get('/', getUser);

// ADD USER

router.post('/', avatarUpload, addUser);

// FIND USER BY ID

router.get('/:id', findUserById);

// UPDATE USER

router.put('/:id', avatarUpload, updateUser);

// DELETE USER

router.delete('/:id', deleteUser);

// DO LOGIN

router.post('/do/login', doLogin);

// DO LOGOUT

router.get('/do/logout',  doLogout);

// CHECK IF USER LOGGED IN

router.get('/check/isLogin', checkLogin('browser'));

module.exports = router;