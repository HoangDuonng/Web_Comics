const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/config')

app.use(express.urlencoded({extended: true}))
app.use("/images", express.static(path.join(__dirname, 'images')))
app.use("/images", express.static("images"))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)
// require('./google')(app)
app.listen(config.port, () =>{
    console.log(`app is listening on port ${config.port}`)
})

