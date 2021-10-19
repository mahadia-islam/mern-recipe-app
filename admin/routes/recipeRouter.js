const express = require('express');
const router = express.Router();
const { avatarUpload } = require('./../middleware/user/avatarUpload');

// CONTROLLER

const {
    getRecipe,
    shareRecipe,
    approveRecipe,
    modifyRecipe,
    getRecipeById,
    deleteRecipe,
    getPendingRecipe,
    searchRecipe
} = require('./../controllers/recipeController');

// GET RECIPE

router.get('/', getRecipe);

// SHARE RECIPE

router.post('/', shareRecipe);

// APPROVE RECIPE

router.put('/approve/:id', approveRecipe);

// MODIFY RECIPE

router.put('/:id', avatarUpload, modifyRecipe);

// GET RECIPE BY ID

router.get('/:id', getRecipeById);

// DELETE RECIPE

router.delete('/:id', deleteRecipe);

// GET PENDING RECIPES

router.get('/get/pending', getPendingRecipe);

// SEARCH RECIPE

router.get('/get/search/:title', searchRecipe);

module.exports = router;