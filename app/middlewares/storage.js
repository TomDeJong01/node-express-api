import jwt from "jsonwebtoken";

const multer = require('multer');

const fileFilter = (req, file, cb) => {
    console.log("file filter thing" + req.user.is_admin);
    cb(null, req.user.is_admin)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("in storage")
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export {storage, fileFilter}
