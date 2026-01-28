import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body

        if(!name || !password || !email){
            return res.json({success:false,message:"Missing credentials"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }

       const newUser = new userModel(userData)
        const user = await newUser.save()
        // _id
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// API fro user login

const loginUser = async (req,res)=>{
    try{

        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:'user does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
           return res.json({success:false,message:"Invalid credentials"})
        }

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// API to get user profile data
const getProfile = async(req,res)=>{
    try{

       const userId = req.userId

        const userData = await userModel.findById(req.userId).  select('-password')
        res.json({success:true,userData})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})

    }
}

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId   
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" })
    }

    await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender
      },
      { new: true }
    )

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        { resource_type: "image" }
      )

      await userModel.findByIdAndUpdate(
        userId,
        { image: imageUpload.secure_url },
        { new: true }
      )
    }

    res.json({ success: true, message: "Profile updated" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// API to book appointment

const bookAppointment = async(req,res)=>{
  try{
    const {docId,slotDate,slotTime} = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if(!docData.available){
      return res.json({success:false,messsage:"Doctor not available"})
    }

    let slots_booked = docData.slots_booked

    // checking for slot availability
    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,message:"Slot not available"})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push[slotTime]
    }

    const userId = req.userId;

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked


    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:"Appointment booked"})

  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message })
    

  }
}

// API to get user appointments
const listAppointment = async(req,res)=>{
  try{
    const userId = req.user.id
    const appointments = await appointmentModel.find({userId})

    res.json({success:true,appointments})

  }catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
}


export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment}