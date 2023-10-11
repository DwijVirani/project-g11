const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/photos'),
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
console.log('storage', storage);
const upload = multer({ storage });

module.exports = {
  upload,
};
