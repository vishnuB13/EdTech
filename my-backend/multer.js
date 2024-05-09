const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the destination directory
      cb(null, 'public/data/uploads/');
    },
    filename: function (req, file, cb) {
      // Set the file name
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Initialize multer with the storage configuration
  const upload = multer({ storage: storage });

  module.exports= upload