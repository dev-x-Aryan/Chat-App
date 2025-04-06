import { createContext, useState, useEffect, useContext } from "react"
import {io} from "socket.io-client"
import { AuthContext } from "./authContext";

export const SocketContext = createContext(null);


export const SocketProvider = ({children}) =>{
    const {user} = useContext(AuthContext)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if(user){
            const newSocket = io("http://localhost:5001", {
                query: {
                  userId: user._id,
                },
            })
            setSocket(newSocket)
            
            //listening to events
            newSocket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })

            return ()=>{
                newSocket.disconnect();
            }
        }
    },[user])

    return(
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}