const mongoose = require('mongoose')

const truyenSchema = new mongoose.Schema({
    tentruyen: {
        type: String,
        required: [true, "thieu ten truyen"]
    },
    tenphu: {
        type: String,
        required: [true, "thieu ten phu truyen"]
    },
    anhbia: {
        type: String,
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
    },
    dadoc:{
        type: Number,
        default: 0
    },
    
})

const Truyen = mongoose.model('Truyen', truyenSchema)

module.exports = Truyen