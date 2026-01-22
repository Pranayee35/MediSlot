import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [atoken,setAtoken] = useState('')
    const [doctors,setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async()=>{
        try{

            const {data}  = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{atoken}})

            if(data.success){
                  console.log("INSIDE IF — THIS SHOULD PRINT")
                console.log("req response:", data)
                
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const value = {
        atoken,setAtoken,
        backendUrl,doctors,getAllDoctors
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider