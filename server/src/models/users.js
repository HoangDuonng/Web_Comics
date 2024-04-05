const { text } = require('body-parser')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        minLength: [8, 'password is too short'],
        // required: [true, 'password is required']
    },
    authGoogleID: {
        type: String,
        default: null
    },
    authType: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    level: {
        type: String,
        required: [true, 'need user level']
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username already exist']
    }
    
})

userSchema.path('username').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({username: value });
    return !emailCount;
},'Username already exist')

const User = mongoose.model('User', userSchema)

module.exports = User