const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookName:{
        type:String,
        require:true
    },
    bookCreator:{
        type:String,
        require:true
    },       
    bookTakenBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        select:true
    }
    
})

module.exports = mongoose.model('BookModel', bookSchema);