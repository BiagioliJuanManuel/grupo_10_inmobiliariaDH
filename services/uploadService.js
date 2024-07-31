const multer = require('multer');
const path = require('node:path');
const crypto = require('node:crypto');

const imageStorage = multer.diskStorage({
    destination: (req,file,callback)=>{
        const folder = path.join(__dirname, '../public/');
        callback(null , folder);
    },
    filename: (req, file, callback)=>{
        let random = crypto.randomBytes(4).toString('hex');
        let extension = path.extname(file.originalname);

        let image = 'img_' + random + extension;
        callback(null, image); 
    }
});

const upload = multer({imageStorage});

module.exports = upload;