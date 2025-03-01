import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("Fetching profile...");  // Debugging
        const response = await axios.get("http://localhost:5001/api/auth/profile", {
          withCredentials: true,  // Ensure cookies are sent
        });
  
        // console.log("Profile Data:", response.data);  // Debugging
        setUser(response.data);
        setProfilePic(response.data.profilePicture);
      } catch (error) {
        console.log("Error fetching user:", error);  // Debugging
        toast.error("Failed to load profile");
      }
    };
  
    fetchUser();
  }, [setUser]);
  

  // Handle profile picture update
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploadProfilePic");

    try {
      setLoading(true);
      const response = await axios.post("https://api.cloudinary.com/v1_1/aryancloudb/image/upload", formData);
      const imageUrl = response.data.secure_url;
      setProfilePic(imageUrl);

      await axios.put(
        "http://localhost:5001/api/auth/profile",
        { profilePicture: imageUrl },
        { withCredentials: true, }
      );

      toast.success("Profile picture updated");
      setUser((prev) => ({ ...prev, profilePicture: imageUrl }));
    } catch (error) {
      toast.error("Failed to update profile picture");
      console.log("Error updating profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="absolute top-10 left-40 w-64 h-64 bg-violet-600  mix-blend-screen filter blur-[70px] opacity-50 animate-floating"></div>
      <div className="absolute bottom-50 right-16 w-64 h-64 bg-blue-400  mix-blend-screen filter blur-[70px] opacity-50 animate-floating"></div>
      <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-indigo-800 mix-blend-screen filter blur-[70px] opacity-50 animate-floatingReverse"></div>

      <div className="bg-white/10 backdrop-blur-2xl shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-blue-400">My Profile</h1>

        <div className="mt-3 flex justify-center items-center">
          <div className="relative">
            <img
              src={profilePic || "Frontend/src/assets/istockphoto-1495088043-612x612.jpg"}
              alt="Profile"
              className="rounded-full w-32 h-32 border-2 border-blue-400"
            />
            <label className="absolute -bottom-1 -right-1 bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors duration-300 cursor-pointer">
              <FontAwesomeIcon icon={faCamera} className="text-white text-sm" />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <div className="mt-4 text-left">
          <h2 className="text-lg font-bold text-blue-400">Name: {user?.name || "Guest"}</h2>
          <h2 className="text-lg font-bold text-blue-400">Email: {user?.email || "Not available"}</h2>
        </div>

        {loading && <p className="text-center text-sm text-gray-400 mt-2">Updating profile picture...</p>}
      </div>
    </div>
  );
};

export default Profile;
