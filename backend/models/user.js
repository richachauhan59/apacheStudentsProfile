const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    Image_Link: {
        type: String,
        required: true,
        trim:true
        
    },
    Name: {
        type: String,
        required: true,
        trim:true,
        minlength:3
    },
    Email: {
        type: String,
        required: true,
        trim:true,
        minlength:3
    },
    City: {
        type: String,
        required: true,
        trim:true,
        minlength:2
    },
    Gender: {
        type: String,
        required: true,
        trim:true,
        minlength:4
    },
    Blood_Group: {
        type: String,
        required: true,
        trim:true,
        minlength:1
    }
})

module.exports = mongoose.model('User', userSchema)

