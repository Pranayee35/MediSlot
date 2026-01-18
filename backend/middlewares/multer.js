import multer from "multer"

// Multer intercepts the request, extracts the image, attaches it to req.file, and then your controller uses it.

const storage = multer.diskStorage({
    filename:function(res,file,callback){
        callback(null,file.originalname

        )
    }
})

const upload = multer({storage})

export default upload