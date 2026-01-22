import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
// API for adding doctor
const addDoctor = async (req,res)=>{
    
    try{

        const {name,email,password,speciality,degree,about,experience,fees,address} = req.body
        const imageFile = req.file

        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !about || !experience || !fees || !address){
            return res.json({success:false,message:"Missing details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // validating strong password
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            about,
            experience,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor= new doctorModel(doctorData)
        await newDoctor.save()
        // new doctorModel(doctorData)
        // ✔️ Mongoose:

        // Takes doctorData

        // Matches it against the schema

        // Creates a new Doctor document object

        // This object exists only in server memory

        // ⚠️ Nothing is saved to MongoDB yet
    // when .save() it gets saved into mongoDB
    // like submitting form after filling it
        res.json({success:true,message:"Doctor Added"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// API for the admin login
const loginAdmin = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(
                email+password,
                process.env.JWT_SECRET
            )
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// API to get all doctors list for admin panel
const allDoctors = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export {addDoctor,loginAdmin,allDoctors}

// This is called a named export.
// Controllers usually contain many functions.

// Example:

// const addDoctor = async () => {}
// const getDoctors = async () => {}
// const deleteDoctor = async () => {}

// export { addDoctor, getDoctors, deleteDoctor }


// If you used default, you can export only ONE thing.

// ❌ This is NOT allowed:

// export default addDoctor
// export default getDoctors   // ❌ illegal

