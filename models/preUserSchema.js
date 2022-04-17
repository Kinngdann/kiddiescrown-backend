const mongoose = require('mongoose');

const preUser = new mongoose.Schema({
    name: String,
    phone: {
        phone1: String,
        phone2: String
    }
});

module.exports = mongoose.model('preUser', preUser);
