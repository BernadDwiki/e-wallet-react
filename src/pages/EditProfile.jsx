import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

// ─── INPUT FIELD ──────────────────────────────────────────────────────────────
function InputField({ label, type, placeholder, icon, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      <div className="flex items-center gap-3 border border-gray-200 focus-within:border-[#2D39F5] rounded-xl px-4 py-3 bg-white transition-colors">
        <img
          src={`${ASSETS}/${icon}`}
          alt=""
          className="w-4 h-4 object-contain opacity-50 shrink-0"
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border-none outline-none text-sm text-gray-900 flex-1 bg-transparent placeholder-gray-400"
        />
      </div>
    </div>
  );
}

function ProfileCard() {
  const { currentUser, updateUser } = useAuth();
  const [profileImage, setProfileImage] = React.useState(`${ASSETS}/User.png`);
  const [name, setName] = React.useState(currentUser?.name || "");
  const [phone, setPhone] = React.useState(currentUser?.phone || "");
  const [email, setEmail] = React.useState(currentUser?.email || "");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser?.name || "");
    setPhone(currentUser?.phone || "");
    setEmail(currentUser?.email || "");
  }, [currentUser]);

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await updateUser({ name, phone, email });
      alert("Profile berhasil diperbarui.");
    } catch (error) {
      alert(error.message || "Gagal memperbarui profil.");
    } finally {
      setIsSaving(false);
    }
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
            onClick={() => setProfileImage(`${ASSETS}/ghaluh.png`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#2D39F5", border: "1.5px solid #2D39F5" }}
          >
            <img src={`${ASSETS}/Edit Square.png`} alt="" className="w-4 h-4 object-contain" />
            Change Profile
          </button>
          <button
            onClick={() => setProfileImage(`${ASSETS}/User.png`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1.5px solid #DC2626" }}
          >
            <img src={`${ASSETS}/Delete.png`} alt="" className="w-4 h-4 object-contain" />
            Delete Profile
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 -mt-2">
        The profile picture must be 512 x 512 pixels or less.
      </p>

      <InputField label="Full Name" type="text" placeholder="Enter Full Name" icon="User.png" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField label="Phone" type="tel" placeholder="Enter Your Number Phone" icon="Phone.png" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <InputField label="Email" type="email" placeholder="Enter Your Email" icon="mail.png" value={email} onChange={(e) => setEmail(e.target.value)} />

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
            src={`${ASSETS}/2 User.png`}
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