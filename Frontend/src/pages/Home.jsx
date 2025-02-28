import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState, useEffect } from "react"


const Home = () => {
  const [chatUsers, setChatUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");  
        const res = await axios.get("http://localhost:5001/api/message/users",
          {withCredentials: true,
        })
        console.log("Users fetched:", res.data);  
        setChatUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);


  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/message/${selectedUser._id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5001/api/message/send/${selectedUser._id}`, {
        text: newMessage,
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* navbar */}
      <nav className="flex justify-between items-center px-6 py-1 bg-opacity-10 backdrop-blur-lg bg-gray-700">
        <h1 className="text-xl font-bold">ChitChat</h1>
        <div className="flex items-center gap-4">
          <button className="text-lg flex items-center gap-2 hover:text-gray-300">
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button className="text-lg flex items-center gap-2 hover:text-red-400">
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      </nav>

      {/* sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 p-4 border-r border-gray-700">
          <h2 className="text-lg">Conversations</h2>
          <div>
            {Array.isArray(chatUsers) ? chatUsers.map((chatUser)=>(
              <div key={chatUser._id} 
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer 
                ${selectedUser?._id === chatUser._id ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
                onClick={() => setSelectedUser(chatUser)}
              >
                <img src={chatUser.profilePic || "../assets/istockphoto-1495088043-612x612.jpg"} alt="pfp" className="w-10 h-10 rounded-full" />
                <span className="font-medium">{chatUser.name}</span>
              </div> 
            )): <p className="text-center text-gray-400">Loading users...</p>}
          </div>
        </div>

        {/* chat section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto bg-white/10 rounded-xl backdrop-blur-md shadow-lg border border-gray-700">
            {selectedUser ? (
              <>
                <h2>{selectedUser.name}</h2>
                <div>
                  {messages.map((msg,idx) => (
                    <div key={idx}
                      className={`p-3 rounded-lg max-w-[60%] ${
                      msg.senderId === selectedUser._id
                        ? "bg-[#2b2b2b] self-start"
                        : "bg-[#007bff] text-white self-end"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-400">Select a user to start chatting</p>
            )}
          </div>

          {/* message input */}
          {selectedUser && (
            <div className="flex items-center p-4 border-t border-gray-700 bg-gray-800">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-900 px-4 py-2 rounded-lg focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={sendMessage} className="ml-3 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
                Send
              </button>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

export default Home
