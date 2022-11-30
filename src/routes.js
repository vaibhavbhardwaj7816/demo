const {Router} = require('express')
const { createAdmin, loginAdmin, logoutAdmin, viewAllResponse, submitResponse } = require('./controller/manager')
const routes = Router()

routes.post('/create-admin',createAdmin)
routes.post('/login-admin',loginAdmin)
routes.post('/logout-admin',logoutAdmin)
routes.post('/submit-response',submitResponse)
routes.get('/view-all-response',viewAllResponse)

module.exports = routes