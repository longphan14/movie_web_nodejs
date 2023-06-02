const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String
});

module.exports = mongoose.model('clients', customerSchema);