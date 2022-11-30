const { connect, connection } = require('mongoose')

const connectToDatabase = async () => {
    try{
        connect(process.env.DB_CONNECTION_STRING)
        connection.on('connected', () => {
            console.log('Database Connection Established!')
        })
        connection.on('disconnected', () => {
            console.log('Database disconnected!')
        })
        process.on('SIGINT',async () => {
            await connection.close()
            process.exit(0)
        })
    } catch(err){
        console.error(err.message)
    }
}

module.exports = {
    connectToDatabase
}