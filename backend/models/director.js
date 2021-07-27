const mongoose = require('mongoose')
const Schema = mongoose.Schema

const directorSchema = new Schema({
    age: Number,
    name: String,
})

module.exports = mongoose.model('Director', directorSchema)
