import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"
import toast from "react-hot-toast"
import axios from "axios"


const useLogout = () =>{
    const {setUser} = useContext(AuthContext)

    const logout = async() =>{
        try{
            const response = await axios.get("http://localhost:5001/api/auth/logout")
            if(response.status === 200){
                toast.success(response.data.message)
            }
            setUser(null)
            localStorage.removeItem("user")
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
    return {logout}
}
export default useLogout;