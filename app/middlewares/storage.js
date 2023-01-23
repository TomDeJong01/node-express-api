import {successMessage} from "../helpers/status";

const multer = require('multer');

const fileFilter = (req, file, cb) => {
    let fileExt = file.originalname.split('.')[file.originalname.split('.').length -1];
    if(fileExt !== "png" || fileExt !== "jpg" || fileExt !== "svg" ) {
        cb(null, false)
    }
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
