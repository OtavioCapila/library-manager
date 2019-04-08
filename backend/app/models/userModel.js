const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        require: true,
        select: true
    },
    booksUserTaken: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookModel',
    }]

})

module.exports = mongoose.model('UserModel', userSchema);