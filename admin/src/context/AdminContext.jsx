import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [atoken,setAtoken] = useState('')
    const value = {
        atoken,setAtoken
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider