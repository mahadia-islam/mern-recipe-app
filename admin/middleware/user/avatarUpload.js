const uploader = require('./../../utilities/uploader');
const path = require('path');

const avatarUpload = (req, res, next) => {
    const uploadFolder = path.join(__dirname, '../../../myapp/public/image/');
    const secondUploadFolder = path.join(__dirname, '../../../mern/public/image/');
    const upload = uploader(
        uploadFolder,
        secondUploadFolder,
        ['image/png', 'image/jpg', 'image/jpeg'],
        'file extension should be jpg,jpeg,png'
    );
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message
                    }
                }
            })
        } else {
            next();
        }
    });
}



module.exports = {
    avatarUpload
};