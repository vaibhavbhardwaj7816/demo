const app = require('./app')
const { connectToDatabase } = require('./models')


const start = async () => {
    await connectToDatabase()
    app.listen( process.env.PORT,() => {
        console.log(`Application running on port ${process.env.PORT}`)
    })
}

start()