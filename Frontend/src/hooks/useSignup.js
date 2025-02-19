import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"
import axios from "axios"
import toast from "react-hot-toast";


const useSignup = () =>{
    const {setUser} = useContext(AuthContext);
    const signup = async(name, email, password) =>{
        try {
            const response = await axios.post("http://localhost:5001/api/auth/signup",{
                name,
                email,
                password
            },{withCredentials: true})
            if(response.status === 201){
                toast.success(response.data.message);
            }
            setUser(response.data);
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    
    return {signup}
}

export default useSignup;