const multer = require('multer');

const fileFilter = (req, file, cb) => {
    cb(null, req.user.is_admin)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export {storage, fileFilter}
