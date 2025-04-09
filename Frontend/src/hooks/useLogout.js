import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"
import toast from "react-hot-toast"
import axios from "axios"
import { SocketContext } from "../contexts/socketCOntext"


const useLogout = () => {
    const { setUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
  
    const logout = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/auth/logout", {
          withCredentials: true
        });
        if (response.status === 200) {
          toast.success(response.data.message || "Logged out successfully");
        }
        socket?.disconnect();
        setUser(null);
        localStorage.removeItem("user");
      } catch (error) {
        const message = error?.response?.data?.message || "Logout failed!";
        toast.error(message);
      }
    };
  
    return { logout };
  };
  
export default useLogout;