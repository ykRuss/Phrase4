const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] 
    },
    role: {
        type: String,
        required: true
    }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
