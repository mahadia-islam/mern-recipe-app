const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        trim:false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;