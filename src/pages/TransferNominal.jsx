import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { PersonInfo, AmountSection, NotesSection } from '../components/TransferSections';
import BottomNav from '../components/BottomNav';
import PinModal from '../components/PinModal';
import TransferSuccessModal from '../components/TransferSuccessModal';
import TransferFailedModal from '../components/TransferFailedModal';
import React from 'react';

function Steps() {
  const steps = [
    { num: 1, label: 'Find People', active: false },
    { num: 2, label: 'Set Nominal', active: true  },
    { num: 3, label: 'Finish',      active: false },
  ];

  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <React.Fragment key={step.num}>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0
              ${step.active ? 'bg-[#2D39F5] text-white' : 'bg-gray-300 text-gray-500'}`}>
              {step.num}
            </div>
            <span className={`text-[13px] font-semibold ${step.active ? 'text-gray-900' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-20 mx-2.5 border-t-2 border-dashed border-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function TransferNominal() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handlePinSubmit = (pin) => {
    if (pin === currentUser.pin) {
      setShowSuccessModal(true);
    } else {
      setShowFailedModal(true);
    }
    setShowPinModal(false);
  };

  return (
    <div
      className="grid min-h-screen font-[Plus_Jakarta_Sans,sans-serif] bg-[#F5F6FA]"
      style={{ gridTemplateRows: '64px 1fr', gridTemplateColumns: '196px 1fr' }}
    >
      <Topbar currentUser={currentUser} />
      <Sidebar />

      {/* position: relative agar modal absolute terkurung di sini */}
      <main className="p-7 mt-16 flex flex-col gap-5 bg-[#F5F6FA] relative">
        {/* Page Header */}
        <div className="flex items-center gap-2.5">
          <img src="/assets/Send-2.png" alt="Transfer Icon" className="w-[22px] h-[22px] object-contain" />
          <h1 className="text-lg font-extrabold text-gray-900">Transfer Money</h1>
        </div>

        {/* Step Indicator */}
        <Steps />

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col gap-7">
          <PersonInfo />
          <AmountSection />
          <NotesSection />

          <button
            onClick={() => setShowPinModal(true)}
            className="w-full py-4 bg-[#2D39F5] text-white border-none rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Submit &amp; Transfer
          </button>
        </div>

        {/* Modal PIN — absolute di dalam main */}
        <PinModal
          isOpen={showPinModal}
          onClose={() => setShowPinModal(false)}
          onPinSubmit={handlePinSubmit}
          recipientName="Ghaluh 1"
        />

        {/* Modal Transfer Success */}
        <TransferSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onTransferAgain={() => {
            setShowSuccessModal(false);
            navigate('/transfer');
          }}
          recipientName="Ghaluh 1"
        />

        {/* Modal Transfer Failed */}
        <TransferFailedModal
          isOpen={showFailedModal}
          onClose={() => setShowFailedModal(false)}
          onTryAgain={() => {
            setShowFailedModal(false);
            setShowPinModal(true);
          }}
          onBackToDashboard={() => {
            setShowFailedModal(false);
            navigate('/dashboard');
          }}
          recipientName="Ghaluh 1"
        />
      </main>

      <BottomNav />
    </div>
  );
}