import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Modal from "../components/Modal";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

export default function ChangePin() {
  const { currentUser, changePin } = useAuth();
  const navigate = useNavigate();
  const [oldPins, setOldPins] = useState(Array(6).fill(''));
  const [newPins, setNewPins] = useState(Array(6).fill(''));
  const [confirmPins, setConfirmPins] = useState(Array(6).fill(''));
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState('old');
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });
  const inputRefs = useRef({ old: [], new: [], confirm: [] });

  const handleChange = (group, index, value) => {
    if (!/^\d?$/.test(value)) return;
    const setter = group === 'old' ? setOldPins : group === 'new' ? setNewPins : setConfirmPins;
    const current = group === 'old' ? oldPins : group === 'new' ? newPins : confirmPins;
    const next = [...current];
    next[index] = value;
    setter(next);
    if (value && index < 5) {
      inputRefs.current[group][index + 1]?.focus();
    }
  };

  const handleKeyDown = (group, index, e) => {
    const current = group === 'old' ? oldPins : group === 'new' ? newPins : confirmPins;
    if (e.key === 'Backspace' && !current[index] && index > 0) {
      inputRefs.current[group][index - 1]?.focus();
    }
  };

  const handlePaste = (group, e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('');
    const next = Array(6).fill('');
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) next[i] = char;
    });
    if (group === 'old') setOldPins(next);
    if (group === 'new') setNewPins(next);
    if (group === 'confirm') setConfirmPins(next);
    const nextEmpty = next.findIndex((p) => p === '');
    inputRefs.current[group][nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const verifyOldPin = () => {
    const oldPin = oldPins.join('');

    if (oldPin.length < 6) {
      setModal({
        isOpen: true,
        title: "PIN Lama Belum Lengkap",
        message: "Silakan isi 6 digit PIN lama.",
        type: "error"
      });
      return;
    }

    if (oldPin !== currentUser.pin) {
      setModal({
        isOpen: true,
        title: "PIN Lama Salah",
        message: "PIN lama tidak sesuai. Coba lagi.",
        type: "error"
      });
      return;
    }

    setModal({
      isOpen: true,
      title: "PIN Lama Benar",
      message: "PIN lama valid. Silakan masukkan PIN baru.",
      type: "success"
    });
  };

  const verifyNewPin = () => {
    const newPin = newPins.join('');

    if (newPin.length < 6) {
      setModal({
        isOpen: true,
        title: "PIN Baru Belum Lengkap",
        message: "Silakan isi 6 digit PIN baru.",
        type: "error"
      });
      return;
    }

    const oldPin = oldPins.join('');
    if (newPin === oldPin) {
      setModal({
        isOpen: true,
        title: "PIN Baru Tidak Boleh Sama",
        message: "PIN baru harus berbeda dari PIN lama.",
        type: "error"
      });
      return;
    }

    setModal({
      isOpen: true,
      title: "PIN Baru Benar",
      message: "PIN baru diterima. Silakan konfirmasi PIN.",
      type: "success"
    });
  };

  const confirmPinAndSave = async () => {
    const newPin = newPins.join('');
    const confirmPin = confirmPins.join('');

    if (confirmPin.length < 6) {
      setModal({
        isOpen: true,
        title: "Konfirmasi PIN Belum Lengkap",
        message: "Silakan isi 6 digit konfirmasi PIN.",
        type: "error"
      });
      return;
    }

    if (newPin !== confirmPin) {
      setModal({
        isOpen: true,
        title: "PIN Tidak Cocok",
        message: "PIN konfirmasi tidak sama dengan PIN baru.",
        type: "error"
      });
      return;
    }

    setIsSaving(true);
    try {
      await changePin(newPin);
      setModal({
        isOpen: true,
        title: "Berhasil",
        message: "PIN berhasil diperbarui.",
        type: "success"
      });
      setShouldNavigate(true);
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Gagal Menyimpan",
        message: error.message || 'Gagal memperbarui PIN.',
        type: "error"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const closeModal = () => {
    if (modal.type === 'success') {
      if (step === 'old') {
        setStep('new');
      } else if (step === 'new') {
        setStep('confirm');
      }
    }
    if (shouldNavigate) {
      navigate('/edit-profile');
      setShouldNavigate(false);
      setOldPins(Array(6).fill(''));
      setNewPins(Array(6).fill(''));
      setConfirmPins(Array(6).fill(''));
      setStep('old');
    }
    setModal(prev => ({ ...prev, isOpen: false }));
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

          <div className="w-full grid gap-6 mt-2">
            {step === 'old' && (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Old PIN</span>
                  <span className="text-xs text-gray-500">Langkah 1 dari 3</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3" onPaste={(e) => handlePaste('old', e)}>
                  {oldPins.map((val, i) => (
                    <input
                      key={`old-${i}`}
                      ref={(el) => (inputRefs.current.old[i] = el)}
                      type="password"
                      inputMode="numeric"
                      autoFocus={step === 'old' && i === 0}
                      maxLength={1}
                      value={val}
                      placeholder="•"
                      disabled={isSaving || step !== 'old'}
                      onChange={(e) => handleChange('old', i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown('old', i, e)}
                      className={`w-12 sm:w-14 h-12 sm:h-14 text-center text-xl sm:text-xl font-bold bg-transparent border-b-2 rounded-none outline-none transition-colors duration-200 ${val ? 'border-[#2D39F5]' : 'border-gray-300'} focus:border-[#2D39F5] placeholder:text-gray-300 ${step !== 'old' ? 'opacity-60' : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 'new' && (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">New PIN</span>
                  <span className="text-xs text-gray-500">Langkah 2 dari 3</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3" onPaste={(e) => handlePaste('new', e)}>
                  {newPins.map((val, i) => (
                    <input
                      key={`new-${i}`}
                      ref={(el) => (inputRefs.current.new[i] = el)}
                      type="password"
                      inputMode="numeric"
                      autoFocus={step === 'new' && i === 0}
                      maxLength={1}
                      value={val}
                      placeholder="•"
                      disabled={isSaving || step !== 'new'}
                      onChange={(e) => handleChange('new', i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown('new', i, e)}
                      className={`w-12 sm:w-14 h-12 sm:h-14 text-center text-xl sm:text-xl font-bold bg-transparent border-b-2 rounded-none outline-none transition-colors duration-200 ${val ? 'border-[#2D39F5]' : 'border-gray-300'} focus:border-[#2D39F5] placeholder:text-gray-300 ${step !== 'new' ? 'opacity-60' : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Confirm PIN</span>
                  <span className="text-xs text-gray-500">Langkah 3 dari 3</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3" onPaste={(e) => handlePaste('confirm', e)}>
                  {confirmPins.map((val, i) => (
                    <input
                      key={`confirm-${i}`}
                      ref={(el) => (inputRefs.current.confirm[i] = el)}
                      type="password"
                      inputMode="numeric"
                      autoFocus={i === 0}
                      maxLength={1}
                      value={val}
                      placeholder="•"
                      disabled={isSaving}
                      onChange={(e) => handleChange('confirm', i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown('confirm', i, e)}
                      className={`w-12 sm:w-14 h-12 sm:h-14 text-center text-xl sm:text-xl font-bold bg-transparent border-b-2 rounded-none outline-none transition-colors duration-200 ${val ? 'border-[#2D39F5]' : 'border-gray-300'} focus:border-[#2D39F5] placeholder:text-gray-300`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={step === 'old' ? verifyOldPin : step === 'new' ? verifyNewPin : confirmPinAndSave}
            disabled={isSaving}
            className="w-full mt-8 py-3.5 bg-[#2D39F5] text-white rounded-[10px] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 border-0"
          >
            {isSaving ? 'Saving...' : step === 'old' ? 'Verify Old PIN' : step === 'new' ? 'Verify New PIN' : 'Confirm & Save PIN'}
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
      </main>

      {/* Bottom Nav (mobile) */}
      <BottomNav />
    </div>
  );
}