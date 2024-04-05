const mongoose = require('mongoose')

const tacgiaSchema = new mongoose.Schema({
    matacgia: {
        type: String,
        required: [true, "thieu ma tac gia"]
    },
    tentacgia: {
        type: String,
        required: [true, "thieu ten tac gia"]
    },
    gioithieu: {
        type: String,
    },
    hinhdaidien: {
        type: String,
    }
})

const Tacgia = mongoose.model('Tacgia', tacgiaSchema)

module.exports = Tacgia;
