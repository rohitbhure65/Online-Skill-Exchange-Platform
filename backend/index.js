const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const userroutes = require('./routes/user')
const authController = require('./Controller/auth')
const authroutes = require('./routes/auth')
const cors = require('cors')
const DB = require('./Lib/db')
require('dotenv').config()
DB()

app.use(cors())
app.use(express.json())
app.use('/api/v1', authController.verifyToken, userroutes.routes)

app.use('/auth', authroutes)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})