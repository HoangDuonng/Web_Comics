const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/TruyenVuiDB');
        console.log('MONGO CONNECTION OPEN!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = {connect};
