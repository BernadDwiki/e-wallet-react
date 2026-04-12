import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { PersonInfo, AmountSection, NotesSection } from '../components/TransferSections';

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
            <div
              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0
                ${step.active ? 'bg-[#2D39F5] text-white' : 'bg-gray-300 text-gray-500'}`}
            >
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
  const [showPinModal, setShowPinModal] = useState(false);
  return (
    <div
      className="grid min-h-screen font-[Plus_Jakarta_Sans,sans-serif] bg-[#F5F6FA]"
      style={{ gridTemplateRows: '64px 1fr', gridTemplateColumns: '196px 1fr' }}
    >
      <Topbar />
      <Sidebar />

      <main className="p-7 mt-16 flex flex-col gap-5 bg-[#F5F6FA]">
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
            className="w-full py-4 bg-[#2D39F5] text-white border-none rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Submit &amp; Transfer
          </button>
        </div>
      </main>
    </div>
  );
}