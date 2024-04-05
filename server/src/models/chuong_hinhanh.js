const mongoose = require('mongoose')
const {v4: uuid} = require('uuid')
const chuonghinhanhSchema =  new mongoose.Schema({
    machuong: {
        type: String,
        required: [true,"thieu ma chuong"]
    },
    hinhanh: {
        type: [String]
    }
})

const ChuongHinhAnh = mongoose.model('Chuonghinhanh', chuonghinhanhSchema)

module.exports = ChuongHinhAnh