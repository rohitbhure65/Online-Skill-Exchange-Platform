const express = require('express')
const app = express()
const authController = require('./Controller/auth')
const userroutes = require('./routes/user')
const authroutes = require('./routes/auth')
const skillsroutes = require('./routes/skill')
const listingroutes = require('./routes/listing')
const cors = require('cors')
const DB = require('./Lib/db')
require('dotenv').config()
DB()

const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/v1', authController.verifyToken, userroutes.routes)
app.use('/api/v1', authController.verifyToken, skillsroutes.routes)
app.use('/api/v1', authController.verifyToken, listingroutes.routes)
app.use('/auth', authroutes)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})