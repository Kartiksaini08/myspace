const express = require("express");
// const fileUpload = require("express-fileupload");
const router = express.Router();
const multer = require('multer');

const {signup ,login} = require("../controllers/Auth");
const { localFileUpload , imageUpload , videoUpload , imageSizeReducer} = require("../controllers/fileUpload");
const {auth} = require("../middlewares/Auth");
//const { default: singleUpload } = require("../middlewares/multer");

// Authentication
router.post("/signup" , signup);
router.post("/login", login);


// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for uploaded files
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      // Define the file name for the uploaded file
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({storage: storage});


// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// api route
router.post("/imageUpload" , upload.single('image') , imageUpload, (req, res) => {
    console.log(req.body);
    //.log(req.file);
    //console.log(req.body.imageFile);
});

router.post("/videoUpload", auth , videoUpload);
router.post("/imageSizeReducer" ,auth , imageSizeReducer);

module.exports = router;