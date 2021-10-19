const createError = require('http-errors');
const multer = require('multer');
const path = require('path');

const uploader = (upload_folder,second_upload_folder,file_types,error_msg) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, upload_folder);
            cb(null, second_upload_folder);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, '')
                .split(' ')
                .join('_')
                .toLowerCase();
            cb(null, fileName + fileExt);
        }
    });

    const upload = multer({
        storage,
        fileFilter: (req, file, cb) => {
            if (file_types.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(createError(error_msg));
            }
        }
    });

    return upload;
}

module.exports = uploader;