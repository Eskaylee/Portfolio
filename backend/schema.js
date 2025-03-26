let mongoose = require('mongoose')

let userSchema =new  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    // date:{
    //     type:Date,
    
    //     required: true
    // }
},{ timestamps: true })

module.exports = mongoose.model('userMessages', userSchema)