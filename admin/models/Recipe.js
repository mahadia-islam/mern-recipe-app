const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'pending'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;