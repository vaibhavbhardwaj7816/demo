const {AdminModel} = require('../models/admin')
const bcrypt = require('bcrypt')
const { UserModel } = require('../models/user')

module.exports = {
    createAdmin: async (request, response) => {
        try{
            let reqData = request.body
            let password = await bcrypt.hash(reqData.password, 12)
            let createNewAdmin = new AdminModel({
                email: reqData.email,
                password: password
            })
            await createNewAdmin.save()
            return response.status(200).json({Message: "Admin Created Successfully!"})
        } catch(err){
            console.error(err.message)
            return response.status(400).json({Message: err.message})
        }
    },
    loginAdmin: async (request, response) => {
        try{
            let reqData = request.body
            let adminData = await AdminModel.findOne({email: reqData.email})
            let comparePassword = await bcrypt.compare(reqData.password, adminData.password)
            if (comparePassword === true){
                await AdminModel.findOneAndUpdate({email: reqData.email},{
                    $set: {
                        isLoggedIn: true
                    }
                })
                return response.status(200).json({Message: "User Logged In Successfully!"})
            } else {
                return response.status(200).json({Message: "Incorrect Password!"})
            }
        } catch(err){
            console.error(err.message)
            return response.status(400).json({Message: err.message})
        }
    },
    logoutAdmin: async (request, response) => {
        try{
            let reqData = request.body
            await AdminModel.findOneAndUpdate({},{
                $set: {
                    isLoggedIn: false
                }
            })
            return response.status(200).json({Message: "User Logged Out Succssfully!"})
        } catch(err){
            console.error(err.message)
            return response.status(400).json({Message: err.message})
        }
    },
    submitResponse: async (request, response) => {
        try{
            let reqData = request.body
            let createNewResponse = new UserModel({
                name: reqData.name,
                age: reqData.age,
                phone: reqData.phone,
                email: reqData.email,
                city: reqData.city
            })
            await createNewResponse.save()
            return response.status(200).json({Message: "Response Recorded Successfully!"})
        } catch(err){
            console.error(err.message)
            return response.status(400).json({Message: err.message})
        }
    },
    viewAllResponse: async (request, response) => {
        try{
            let adminData = await AdminModel.find()
            let isLoggedIn = adminData[0].isLoggedIn
            if (isLoggedIn === true){
                let getAllResponse = await UserModel.find()
                return response.status(200).json({getAllResponse})
            } else {
                return response.status(200).json({Message: "Please log in to view all the responses!"})
            }
        } catch(err){
            console.error(err.message)
            return response.status(400).json({Message: err.message})
        }
    }
}