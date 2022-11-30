const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    city: {type: String, required: true}
})

const UserModel  = model('Users',userSchema)
module.exports = {UserModel}