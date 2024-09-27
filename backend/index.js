const express = require('express')
const app = express()
const DB = require('./Lib/db')
const PORT = process.env.PORT || 8000
const userroutes = require('./routes/user')
require('dotenv').config()
DB()

app.use(express.json())
app.use('/api/v1', userroutes.routes)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})