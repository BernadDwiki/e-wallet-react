import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAmount, setNotes, clearTransfer } from '../store/slice/transferSlice.js';
import { addTransferHistory } from '../store/slice/historySlice.js';
import { useAuth } from '../hooks/useAuth.js';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { PersonInfo, AmountSection, NotesSection } from '../components/TransferSections';
import BottomNav from '../components/BottomNav';
import PinModal from '../components/PinModal';
import TransferFailedModal from '../components/TransferFailedModal';
import { createTransfer } from '../services/transferService.js';
import React from 'react';

function Steps() {
  const steps = [
    { num: 1, label: 'Find People', active: false },
    { num: 2, label: 'Set Nominal', active: true  },
    { num: 3, label: 'Finish',      active: false },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2">
      {steps.map((step, i) => (
        <React.Fragment key={step.num}>
          <div className="flex items-center gap-1 md:gap-2">
            <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0
              ${step.active ? 'bg-[#2D39F5] text-white' : 'bg-gray-300 text-gray-500'}`}>
              {step.num}
            </div>
            <span className={`text-[11px] md:text-[13px] font-semibold ${step.active ? 'text-gray-900' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-10 md:w-20 mx-1 md:mx-2.5 border-t-2 border-dashed border-gray-300 flex-shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function TransferNominal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const selectedPerson = useSelector((state) => state.transfer.selectedPerson);
  const amount = useSelector((state) => state.transfer.amount);
  const notes = useSelector((state) => state.transfer.notes);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [retryWithPin, setRetryWithPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatAmountValue = (value) => {
    const numeric = value.replace(/\D/g, '');
    return numeric ? parseInt(numeric, 10) : 0;
  };

  const handleSubmit = () => {
    if (!selectedPerson) {
      setRetryWithPin(false);
      setShowFailedModal(true);
      return;
    }

    const transferAmount = formatAmountValue(amount);
    if (!amount || transferAmount <= 0) {
      setRetryWithPin(false);
      setShowFailedModal(true);
      return;
    }

    setShowPinModal(true);
  };

  const handlePinSubmit = async (pin) => {
    setShowPinModal(false);

    if (!pin || pin.length < 6) {
      setRetryWithPin(false);
      setShowFailedModal(true);
      return;
    }

    if (!selectedPerson) {
      setRetryWithPin(false);
      setShowFailedModal(true);
      return;
    }

    const transferAmount = formatAmountValue(amount);
    if (transferAmount <= 0) {
      setRetryWithPin(false);
      setShowFailedModal(true);
      return;
    }

    setIsSubmitting(true);

    const result = await createTransfer({
      receiver_id: selectedPerson.id,
      amount: transferAmount,
      note: notes,
      pin,
    });

    setIsSubmitting(false);

    if (result.success) {
      dispatch(addTransferHistory({
        recipient: selectedPerson,
        amount: transferAmount,
        notes,
        type: 'outgoing',
      }));
      dispatch(clearTransfer());
      navigate('/transfer-success', { state: result.data.data });
      return;
    }

    setRetryWithPin(true);
    setShowFailedModal(true);
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

      {/* position: relative agar modal absolute terkurung di sini */}
      <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA] relative">
        {/* Page Header */}
        <div className="flex items-center gap-2.5">
          <img src="/assets/Send-2.png" alt="Transfer Icon" className="w-[22px] h-[22px] object-contain" />
          <h1 className="text-lg font-extrabold text-gray-900">Transfer Money</h1>
        </div>

        {/* Step Indicator */}
        <Steps />

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col gap-7">
          <PersonInfo
            name={selectedPerson?.name}
            phone={selectedPerson?.phone_number || selectedPerson?.phone}
            avatar={selectedPerson?.avatar}
          />
          <AmountSection value={amount} onChange={(e) => dispatch(setAmount(e.target.value))} />
          <NotesSection value={notes} onChange={(e) => dispatch(setNotes(e.target.value))} />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-[#2D39F5] text-white border-none rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit & Transfer'}
          </button>
        </div>

        {/* Modal PIN — absolute di dalam main */}
        <PinModal
          isOpen={showPinModal}
          onClose={() => setShowPinModal(false)}
          onPinSubmit={handlePinSubmit}
          recipientName={selectedPerson?.name || 'Recipient'}
        />

        <TransferFailedModal
          isOpen={showFailedModal}
          onClose={() => setShowFailedModal(false)}
          onTryAgain={() => {
            setShowFailedModal(false);
            if (retryWithPin) {
              setShowPinModal(true);
            }
          }}
          onBackToDashboard={() => {
            setShowFailedModal(false);
            dispatch(clearTransfer());
            navigate('/dashboard');
          }}
          recipientName={selectedPerson?.name || 'Recipient'}
        />
      </main>

      <BottomNav />
    </div>
  );
}
