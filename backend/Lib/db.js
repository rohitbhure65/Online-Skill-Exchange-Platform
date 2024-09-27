const mongoose = require('mongoose')
require('dotenv').config()

const DB = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGODB_CONNECT)
        .then(()=>{
            console.log(`Mongodb Connected`)
        })
        .catch((err)=>{
            console.log('MONGODB ERROR', err)
        })
}

module.exports = DB