const mongoose = require("mongoose")

const on_offSchema = mongoose.Schema({
    on : Boolean
},{timestamps : true})

const on_off = mongoose.model("on_off", on_offSchema)

module.exports = on_off