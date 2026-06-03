import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth.js";
import { updateProfile } from "../services/authService.js";
import { setCurrentUser } from "../store/slice/authSlice.js";
import Modal from "../components/Modal";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";
const API_BASE = "http://localhost:8080";

// Utility function to prepend API base URL to image paths
const getImageUrl = (imagePath) => {
  if (!imagePath) return `${ASSETS}/User.png`;
  if (imagePath.startsWith("http")) return imagePath; // Already full URL
  if (imagePath.startsWith("/img/")) return `${API_BASE}${imagePath}`; // Relative path from API
  return imagePath; // Assume it's already accessible
};

// ─── INPUT FIELD ──────────────────────────────────────────────────────────────
function InputField({ label, type, placeholder, icon, value, onChange, disabled = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-white transition-colors ${disabled ? 'border-gray-100 bg-gray-50' : 'border-gray-200 focus-within:border-[#2D39F5]'}`}>
        <img
          src={`${ASSETS}/${icon}`}
          alt=""
          className={`w-4 h-4 object-contain shrink-0 ${disabled ? 'opacity-30' : 'opacity-50'}`}
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`border-none outline-none text-sm flex-1 bg-transparent placeholder-gray-400 ${disabled ? 'text-gray-500 cursor-not-allowed' : 'text-gray-900'}`}
        />
      </div>
    </div>
  );
}

function ProfileCard() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const fileInputRef = React.useRef(null);
  const [profileImage, setProfileImage] = React.useState(getImageUrl(currentUser?.picture) || `${ASSETS}/User.png`);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [name, setName] = React.useState(currentUser?.name || "");
  const [phone, setPhone] = React.useState(currentUser?.phone || "");
  const [email, setEmail] = React.useState(currentUser?.email || "");
  const [isSaving, setIsSaving] = React.useState(false);
  const [modal, setModal] = React.useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  React.useEffect(() => {
    setName(currentUser?.name || "");
    setPhone(currentUser?.phone || "");
    setEmail(currentUser?.email || "");
    setProfileImage(getImageUrl(currentUser?.picture) || `${ASSETS}/User.png`);
  }, [currentUser]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setModal({
        isOpen: true,
        title: "Invalid File",
        message: "Only JPG, JPEG, or PNG images are allowed.",
        type: "error"
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setModal({
        isOpen: true,
        title: "File Too Large",
        message: "Image size must be 2MB or less.",
        type: "error"
      });
      return;
    }

    setSelectedFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteProfile = () => {
    setSelectedFile(null);
    setProfileImage(`${ASSETS}/User.png`);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      console.log("Submitting profile update with:", {
        name,
        phone,
        selectedFile: selectedFile?.name,
      });

      const result = await updateProfile({
        name,
        phone_number: phone,
        profile_picture: selectedFile,
      });

      console.log("Update result:", result);

      if (!result.success) {
        throw new Error(result.message || "Gagal memperbarui profil.");
      }

      const updatedProfile = result.data?.data;
      if (updatedProfile) {
        const updatedCurrentUser = {
          ...currentUser,
          name: updatedProfile.name,
          phone: updatedProfile.phone_number || updatedProfile.phoneNumber || phone,
          picture: updatedProfile.picture || currentUser?.picture,
        };

        dispatch(setCurrentUser(updatedCurrentUser));
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
        setProfileImage(getImageUrl(updatedProfile.picture) || getImageUrl(currentUser?.picture) || profileImage);
      }

      setModal({
        isOpen: true,
        title: "Profile Updated",
        message: "Profile berhasil diperbarui.",
        type: "success"
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setModal({
        isOpen: true,
        title: "Update Failed",
        message: error.message || "Gagal memperbarui profil.",
        type: "error"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col gap-5">
      <div className="text-sm font-bold text-gray-900 -mb-1">Profile Picture</div>
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
          <img
            src={profileImage}
            alt="Profile"
            className={`object-cover ${profileImage === `${ASSETS}/ghaluh.png` ? "w-full h-full" : "w-1/2 h-1/2"}`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleChooseFile}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#2D39F5", border: "1.5px solid #2D39F5" }}
          >
            <img src={`${ASSETS}/Edit Square.png`} alt="" className="w-4 h-4 object-contain" />
            Change Profile
          </button>
          <button
            type="button"
            onClick={handleDeleteProfile}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1.5px solid #DC2626" }}
          >
            <img src={`${ASSETS}/Delete.png`} alt="" className="w-4 h-4 object-contain" />
            Delete Profile
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-xs text-gray-400 -mt-2">
        The profile picture must be 512 x 512 pixels or less.
      </p>

      <InputField label="Full Name" type="text" placeholder="Enter Full Name" icon="User.png" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField label="Phone" type="tel" placeholder="Enter Your Number Phone" icon="Phone.png" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <InputField label="Email" type="email" placeholder="Enter Your Email" icon="mail.png" value={email} onChange={(e) => setEmail(e.target.value)} disabled />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-900">Password</label>
        <Link
          to="/change-password"
          className="text-sm font-semibold hover:underline"
          style={{ color: "#2D39F5", textDecoration: "none" }}
        >
          Change Password
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-900">Pin</label>
        <Link
          to="/change-pin"
          className="text-sm font-semibold hover:underline"
          style={{ color: "#2D39F5", textDecoration: "none" }}
        >
          Change Pin
        </Link>
      </div>

      <button
        disabled={isSaving}
        onClick={handleSubmit}
        className="w-full py-4 text-white text-base font-bold rounded-xl cursor-pointer mt-1 hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ backgroundColor: "#2D39F5" }}
      >
        {isSaving ? "Saving..." : "Save Profile"}
      </button>

      <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
        <div className={`p-4 rounded-lg ${
          modal.type === 'success' ? 'bg-green-50 text-green-800' :
          modal.type === 'error' ? 'bg-red-50 text-red-800' :
          'bg-blue-50 text-blue-800'
        }`}>
          <p className="text-center">{modal.message}</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-[#2D39F5] text-white rounded-lg hover:bg-[#233cbd] transition-colors"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────
export default function EditProfile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4a6cf7] to-[#2d46c0]">
        <div className="text-white text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[196px_1fr] min-h-screen font-[Plus_Jakarta_Sans,sans-serif] bg-[#F5F6FA]"
      style={{ gridTemplateRows: '64px 1fr' }}
    >
      <div className="col-span-1 md:col-span-2">
        <Topbar currentUser={currentUser} />
      </div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA]">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <img
            src={`${ASSETS}/2 User(1).png`}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <h1 className="text-lg font-extrabold text-gray-900">Profile</h1>
        </div>

        {/* Card */}
        <ProfileCard />
      </main>

      {/* Bottom Nav (mobile) */}
      <BottomNav />
    </div>
  );
}