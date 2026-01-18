import validator from "validator"
import bcrypt from "bcrypt"

// API for adding doctor
const addDoctor = async (req,res)=>{
    
    try{

        const {name,email,password,speciality,degree,about,experience,fees,address} = req.body
        const imageFile = req.file

       
        
    }catch(error){

    }
}

export {addDoctor}

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

