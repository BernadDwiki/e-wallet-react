import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

export default function ChangePin() {
  const { currentUser, changePin } = useAuth();
  const [pins, setPins] = useState(Array(6).fill(''));
  const [isSaving, setIsSaving] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...pins];
    next[index] = value;
    setPins(next);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const pin = pins.join('');
    if (pin.length < 6) {
      alert('Please fill all 6 PIN digits.');
      return;
    }
    setIsSaving(true);
    try {
      await changePin(pin);
      alert('PIN berhasil diperbarui.');
      setPins(Array(6).fill(''));
    } catch (error) {
      alert(error.message || 'Gagal memperbarui PIN.');
    } finally {
      setIsSaving(false);
    }
  };

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
      <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA] overflow-auto">
        {/* Page Header */}
        <div className="flex items-center gap-2.5">
          <img
            src={`${ASSETS}/2 User.png`}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <h1 className="text-lg font-extrabold text-gray-900">Profile</h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl px-9 py-10 flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 text-xl font-extrabold text-gray-900">
            Change Pin
            <span className="text-xl">👋</span>
          </div>

          <p className="text-sm text-gray-400 -mt-2">
            Please save your pin because this so important.
          </p>

          {/* PIN Inputs */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {pins.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                placeholder="0"
                disabled={isSaving}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 sm:w-14 h-12 sm:h-14 text-center text-xl sm:text-xl font-bold bg-transparent border-b-2 rounded-none outline-none transition-colors duration-200 ${val ? 'border-[#2D39F5]' : 'border-gray-300'} focus:border-[#2D39F5] placeholder:text-gray-300`}
              />
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="w-full mt-8 py-3.5 bg-[#2D39F5] text-white rounded-[10px] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 border-0"
          >
            {isSaving ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </main>

      {/* Bottom Nav (mobile) */}
      <BottomNav />
    </div>
  );
}