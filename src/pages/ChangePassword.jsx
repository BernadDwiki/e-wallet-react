import { useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

function PasswordField({ label, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      <div className="flex items-center gap-3 border border-gray-200 focus-within:border-[#2D39F5] rounded-xl px-4 py-3 bg-white transition-colors">
        <img
          src={`${ASSETS}/Password.png`}
          alt=""
          className="w-4 h-4 object-contain opacity-50 flex-shrink-0"
        />
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="flex-1 border-none outline-none text-sm text-gray-900 bg-transparent placeholder-gray-400"
        />
        <img
          src={show ? `${ASSETS}/Eye.png` : `${ASSETS}/EyeSlash.png`}
          alt="Toggle visibility"
          className="w-4 h-4 object-contain opacity-40 cursor-pointer flex-shrink-0 hover:opacity-70 transition-opacity"
          onClick={() => setShow(!show)}
        />
      </div>
    </div>
  );
}

function ChangePasswordContent() {
  return (
    <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA] overflow-auto">
      {/* Page Header */}
      <div className="flex items-center gap-2.5">
        <img
          src={`${ASSETS}/Password.png`}
          alt=""
          className="w-5 h-5 object-contain"
        />
        <h1 className="text-lg font-extrabold text-gray-900">Change Password</h1>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col gap-5">
        <PasswordField
          label="Existing Password"
          placeholder="Enter Your Existing Password"
        />
        <PasswordField
          label="New Password"
          placeholder="Enter Your New Password"
        />
        <PasswordField
          label="Confirm New Password"
          placeholder="Re-Type Your New Password"
        />

        <button className="w-full py-4 text-white text-base font-bold rounded-xl cursor-pointer mt-1 hover:opacity-90 transition-opacity" style={{ backgroundColor: "#2D39F5" }}>
          Submit
        </button>
      </div>
    </main>
  );
}

export default function ChangePassword() {
  const currentUser = useRequireAuth();

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
      <ChangePasswordContent />

      {/* Bottom Nav (mobile) */}
      <BottomNav />
    </div>
  );
}