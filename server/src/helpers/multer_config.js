const multer = require('multer');
const {v4: uuid} = require('uuid')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././src/images');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + file.originalname);
        const nameSplit = file.originalname.split(".")
        cb(null, uuid() + "." + nameSplit[nameSplit.length-1])
    }
});

const chuongImgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././src/images/chuongImgs')
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + file.originalname);
        const nameSplit = file.originalname.split(".")
        cb(null, uuid() + "." + nameSplit[nameSplit.length-1])
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'  ||
        file.mimetype === 'image/heic' ||
        file.mimetype === 'image/webp' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'video/quicktime' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/h264' ||
        file.mimetype === 'video/mpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2000 // 500MB -> 2GB
    },
    fileFilter: fileFilter
});

const chuongImgUpload = multer({
    storage: chuongImgStorage,
    limits: {
        fileSize: 1024 * 1024 * 2000 // 500MB -> 2GB
    },
    fileFilter: fileFilter
})

const fields = [
    {
        name: 'imageUploads',
        maxCount: 16
    },
    {
        name: 'videoUploads',
        maxCount: 16
    }
]


module.exports = {
    upload: upload,
    chuongImgUpload: chuongImgUpload,
    fields: fields
}
