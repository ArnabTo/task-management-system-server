const mongoose = require('mongoose')
require('dotenv').config();



const ConnectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
    }catch(error){
        console.error('Failed to connecting with the database')
        process.exit(0)
    }
}

module.exports = ConnectDB;