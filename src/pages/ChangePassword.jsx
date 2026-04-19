import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { validateChangePasswordForm } from "../utils/validation.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

function PasswordField({ label, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      <div className={`relative flex items-center gap-3 border rounded-lg px-3 py-2.5 bg-white transition-colors ${
        error ? 'border-red-500' : 'border-gray-200 focus-within:border-[#4a6cf7] focus-within:ring-2 focus-within:ring-[#4a6cf7]'
      }`}>
        <img
          src={`${ASSETS}/Password.png`}
          alt=""
          className="w-4 h-4 object-contain opacity-50 shrink-0"
        />
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 border-none outline-none text-sm text-gray-900 bg-transparent placeholder-gray-400"
        />
        <img
          src={show ? `${ASSETS}/Eye.png` : `${ASSETS}/EyeSlash.png`}
          alt="Toggle visibility"
          className="w-4 h-4 object-contain opacity-40 cursor-pointer shrink-0 hover:opacity-70 transition-opacity"
          onClick={() => setShow(!show)}
        />
      </div>
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
    </div>
  );
}

function ChangePasswordContent() {
  const { changePassword, currentUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    if (field === 'currentPassword') setCurrentPassword(value);
    if (field === 'newPassword') setNewPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);

    // Real-time validation
    const formErrors = validateChangePasswordForm({
      currentPassword: field === 'currentPassword' ? value : currentPassword,
      newPassword: field === 'newPassword' ? value : newPassword,
      confirmPassword: field === 'confirmPassword' ? value : confirmPassword
    });
    setErrors(formErrors);
  };

  const handleSubmit = async () => {
    const formErrors = validateChangePasswordForm({
      currentPassword,
      newPassword,
      confirmPassword
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      alert("Password berhasil diubah.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.message || "Gagal mengubah password.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA] overflow-auto">
      <div className="flex items-center gap-2.5">
        <img
          src={`${ASSETS}/Password.png`}
          alt=""
          className="w-5 h-5 object-contain"
        />
        <h1 className="text-lg font-extrabold text-gray-900">Change Password</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col gap-4">
        <PasswordField
          label="Existing Password"
          placeholder="Enter Your Existing Password"
          value={currentPassword}
          onChange={(e) => handleChange('currentPassword', e.target.value)}
          error={errors.currentPassword || errors.current}
        />

        <PasswordField
          label="New Password"
          placeholder="Enter Your New Password"
          value={newPassword}
          onChange={(e) => handleChange('newPassword', e.target.value)}
          error={errors.newPassword || errors.password}
        />

        <PasswordField
          label="Confirm New Password"
          placeholder="Re-Type Your New Password"
          value={confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword || errors.confirm}
        />

        <button
          onClick={handleSubmit}
          disabled={isSaving || Object.keys(errors).length > 0}
          className="w-full py-4 text-white text-base font-bold rounded-xl cursor-pointer mt-4 hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#2D39F5" }}
        >
          {isSaving ? "Saving..." : "Submit"}
        </button>
      </div>
    </main>
  );
}

export default function ChangePassword() {
  const { currentUser } = useAuth();

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