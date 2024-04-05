const mongoose = require('mongoose')
const {v4: uuid} = require('uuid')
const chuongSchema =  new mongoose.Schema({
    // machuong: {
    //     type: String,
    //     required: [true,"thieu ma chuong"],
    //     index: { unique: true, sparse: true },
    //     dropDups: true
    // },
    chuong_so: {
        type: Number,
        required: [true,"thieu chuong so"]
    },
    chuong_ten: {
        type: String,
        required: [true, "thieu ten chuong"]
    },
    matruyen: {
        type: String,
        required: [true,"can ma truyen"]
    }
})

const Chuong = mongoose.model('Chuong', chuongSchema)

module.exports = Chuong