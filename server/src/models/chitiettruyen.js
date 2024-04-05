const mongoose = require('mongoose')

const chiTietTruyenSchema = new mongoose.Schema({
    matruyen: {
        type: String,
        required: [true, "thieu ma truyen"]
    },
    noidung: {
        type: String,
        required: [true, "thieu ten phu truyen"]
    },
    tacgia: {
        type: String,
        required: [true, "thieu tac gia"]
    },
    nxb:{
        type: String,
        required: [true, "thieu nha xuat ban"]
    },
    theloai:{
        type: String,
        required: [true, "thieu the loai"]
    }
    
})

const ChiTietTruyen = mongoose.model('ChiTietTruyen', chiTietTruyenSchema)

module.exports = ChiTietTruyen