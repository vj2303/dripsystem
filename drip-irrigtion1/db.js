const mongoose = require("mongoose")
require("dotenv").config()

const mongoURL = process.env.mongoURL

const connectToMongo = (()=>{
    mongoose.connect(mongoURL)
    .then(console.log("Mongo Connected"))
})

module.exports = connectToMongo