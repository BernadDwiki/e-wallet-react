import { useState, useRef } from 'react';
import Modal from './Modal';

export default function PinModal({ isOpen, onClose, recipientName = 'Ghaluh 1' }) {
  const [pin, setPin] = useState('');
  const inputRef = useRef(null);

  const handleClose = () => {
    setPin('');
    onClose();
  };

  const handleNext = () => {
    if (pin.length < 6) return;
    // TODO: validasi PIN dan lanjut ke step berikutnya
    console.log('PIN submitted:', pin);
    handleClose();
  };

  const handlePinChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(raw);
  };

  const handlePinKeyDown = (e) => {
    if (e.key === 'Backspace' && pin.length > 0) {
      e.preventDefault();
      setPin((prev) => prev.slice(0, -1));
    }
  };

  const pinDigits = Array.from({ length: 6 }, (_, idx) => pin[idx] || '');

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      backdropClassName="top-16 left-0 right-0 bottom-0 md:left-49"
      disableBodyScroll={false}
    >
      {/* Card modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-6 p-7 flex flex-col gap-5">
        {/* Label transfer target */}
        <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
          Transfer to {recipientName}
        </p>

        {/* Judul */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
            Enter Your Pin 👋
          </h2>
          <p className="text-[13px] text-gray-400">
            Enter Your Pin For Transaction.
          </p>
        </div>

        {/* Input PIN */}
        <div
          className="grid grid-cols-6 gap-3 py-3"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={handlePinChange}
            onKeyDown={handlePinKeyDown}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />
          {pinDigits.map((digit, index) => (
            <div
              key={index}
              className={`h-14 border-b-2 flex items-end justify-center pb-2 text-2xl font-bold ${digit ? 'border-[#2D39F5] text-gray-900' : 'border-gray-300 text-gray-300'}`}
            >
              {digit || ''}
            </div>
          ))}
        </div>

        {/* Tombol Next */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-[#2D39F5] text-white rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity border-none"
        >
          Next
        </button>

        {/* Forgot PIN */}
        <p className="text-center text-[13px] text-gray-400">
          Forgot Your Pin?{' '}
          <button
            className="text-[#2D39F5] font-bold bg-transparent border-none cursor-pointer font-[inherit] text-[13px] p-0"
            onClick={() => {/* TODO: navigate to reset PIN */}}
          >
            Reset
          </button>
        </p>
      </div>
    </Modal>
  );
}