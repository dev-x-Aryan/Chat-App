import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"
import axios from "axios"


const useLogin = () =>{
    const {setUser} = useContext(AuthContext);
    const login = async(email, password) =>{
        try {
            const response = await axios.post("http://localhost:5001/api/auth/login",{
                email,
                password
            })
            setUser(response.data);
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }catch(error){
            console.log("Login error", error.response.data.message);
        }
    }
    
    return {login}
}

export default useLogin;