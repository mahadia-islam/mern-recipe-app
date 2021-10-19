const express = require('express');
const router = express.Router();

// CONTROLLERS

const { addPeople, loginPeople, getPeople, doLogout } = require('./../controllers/peopleController');
const { checkLoginBrowser } = require('./../middleware/people/checkLoginBrowser');

// GET PEOPLE

router.get('/', getPeople);

// ADD PEOPLE

router.post('/', addPeople);

// DO LOGIN 

router.post('/login', loginPeople);

// CHECK IF USER LOGIN FOR BROWSER

router.get('/islogin', checkLoginBrowser('browser'));

// DO LOGOUT

router.get('/logout', doLogout);

module.exports = router;