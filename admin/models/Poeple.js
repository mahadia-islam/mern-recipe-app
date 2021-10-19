const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;