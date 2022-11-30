const {model, Schema} = require('mongoose')

const adminSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isLoggedIn: {type: Boolean, requird: true, default: false}
})

const AdminModel  = model('Admin',adminSchema)
module.exports = {AdminModel}