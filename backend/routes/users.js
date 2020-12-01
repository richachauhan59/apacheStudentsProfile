const express = require("express");
const router = express.Router();
const {getUsers, addUser,updateUser,deleteUser} = require("../controller/controller");
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: ( request , file, callback ) =>{
        callback(null, path.join(__dirname, "../uploads"));
    }, filename: ( request, file , callback ) => {
        callback(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null , true)
    }
    else{
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})


router.get("/", getUsers);
router.post("/add", upload.single("Image_Link") , addUser);
router.post("/update/:id" , upload.single("Image_Link") ,updateUser)
router.delete("/delete/:id",deleteUser)


module.exports = router;


