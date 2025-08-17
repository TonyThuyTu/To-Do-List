const mongooese = require('mongoose');

const customerSchema = new mongooese.Schema({

    lastname: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },

    nickname: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    
    },

    {
        timestamps: true,
    }
);

module.exports = mongooese.model('Customer', customerSchema);