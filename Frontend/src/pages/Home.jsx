import { faPowerOff, faUser, faPlus, faSearch, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { SocketContext } from "../contexts/socketCOntext";
import { AuthContext } from "../contexts/authContext";

const Home = () => {
  const [chatUsers, setChatUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const {socket, onlineUsers} = useContext(SocketContext)
  const {user} = useContext(AuthContext)



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
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
        // const token = localStorage.getItem("token");  
        const res = await axios.get(`http://localhost:5001/api/message/${selectedUser._id}`,{
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages()
  }, [selectedUser])

  useEffect(() => {
    if (!socket) return;
  
    const handleIncomingMessage = (newMessage) => {
      if (newMessage.senderId === selectedUser?._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
  
    socket.on("receiveMessage", handleIncomingMessage);
  
    return () => {
      socket.off("receiveMessage", handleIncomingMessage);
    };
  }, [socket, selectedUser]);
  

  const sendMessage = async () => {
    if (!newMessage.trim() && !selectedImage) return;
    try {
      const payload = {
        senderId: user._id,
        receiverId: selectedUser._id,
        text: newMessage,
        image: selectedImage,
      };
      console.log(selectedImage)
      const res = await axios.post(`http://localhost:5001/api/message/send/${selectedUser._id}`, 
        payload ,{
        withCredentials: true
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      setSelectedImage(null)

      {/*real time messaging */}
      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId: selectedUser._id,
        text: newMessage,
        image: selectedImage,
      });
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleImageChange = (e) =>{
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected");
      return;
    }
    const img = e.target.files[0];
    if(img){
      const reader = new FileReader();
      reader.readAsDataURL(img)
      reader.onloadend = () =>{
        setSelectedImage(reader.result)
      }
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#1a1a2e] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-[#16213e] to-[#3a0ca3] shadow-lg">
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

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gradient-to-r from-[#16213e] to-[#3a0ca3] border-r border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <FontAwesomeIcon icon={faPlus} className="text-lg cursor-pointer" />
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#2b2b4b] text-white px-4 py-2 rounded-lg pl-10"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div>
            {chatUsers.map((chatUser) => (
              <div
                key={chatUser._id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  selectedUser?._id === chatUser._id ? "bg-gray-700" : "hover:bg-gray-700/50"
                }`}
                onClick={() => setSelectedUser(chatUser)}
              >
                <div className="relative">
                  <img src={chatUser.profilePic || "/assets/istockphoto-1495088043-612x612.jpg"} alt="pfp" className="w-10 h-10 rounded-full" />
                  {Array.isArray(onlineUsers) && onlineUsers.includes(chatUser._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>)}
                </div>
                
                <div>
                  <span className="font-medium">{chatUser.name}</span>
                  {/* <p className="text-sm text-gray-400 truncate">Last message...</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-900 text-white p-4">
        {selectedUser ? (
        <>
        {/* Chat Header */}
          <div className="flex items-center gap-3 p-3 border-b border-gray-700 bg-gray-800 rounded-lg">
            <img
              src={selectedUser.profilePic || "/assets/istockphoto-1495088043-612x612.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-900 rounded-lg border border-gray-700">
            {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.senderId === selectedUser._id ? "justify-start" : "justify-end"}`}>
              <div
                className={`p-3 rounded-lg max-w-[60%] mb-2 ${
                msg.senderId === selectedUser._id ? "bg-gray-800 text-gray-300" : "bg-blue-600 text-white"
                }`}
              >
                {msg.text}
                {msg.image && <img src={msg.image} alt="sent" className="mt-2 rounded-lg max-w-xs" />}
              </div>
            </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex items-center p-4 border-t border-gray-700 bg-gray-800 rounded-lg">
            {/* Image Upload */}
            <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange} />
            <label htmlFor="imageUpload" className="cursor-pointer text-gray-400 hover:text-white px-3">
              <FontAwesomeIcon icon={faImage} size="lg" />
            </label>

            {/* Image Preview */}
            {selectedImage && (
              <div className="relative mr-3">
                <img src={selectedImage} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-gray-700" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Message Input */}
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-900 px-4 py-2 rounded-lg focus:outline-none text-white"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="ml-3 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
              Send
            </button>
          </div>
        </>
        ) : (
              <p className="text-center text-gray-400 text-xl flex items-center justify-center flex-1">Start chatting...</p>
            )}
      </div>

      </div>
    </div>
  );
};

export default Home;
