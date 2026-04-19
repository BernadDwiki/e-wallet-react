import Modal from './Modal';

export default function TransferSuccessModal({
  isOpen,
  onClose,
  onTransferAgain,
  recipientName = 'Ghaluh 1',
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdropClassName="top-16 left-0 right-0 bottom-0 md:left-49"
      disableBodyScroll={false}
    >
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-6 p-7 flex flex-col gap-5 items-center">
        {/* Label transfer target */}
        <p className="self-start text-[11px] font-bold tracking-widest text-gray-400 uppercase">
          Transfer to {recipientName}
        </p>

        {/* Ilustrasi */}
        <img
          src="/assets/Contact us-pana 1.png"
          alt="Transfer Success Illustration"
          className="w-48 h-48 object-contain"
        />

        {/* Teks sukses */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Yeay Transfer <span className="text-[#2D39F5]">Success</span>
          </h2>
          <p className="text-[13px] text-gray-400">
            Thank you for using this application for your financial
          </p>
        </div>

        {/* Tombol Done */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#2D39F5] text-white rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity border-none"
        >
          Done
        </button>

        {/* Tombol Transfer Again */}
        <button
          onClick={onTransferAgain}
          className="w-full py-3.5 bg-white text-[#2D39F5] rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:bg-gray-50 transition-colors border border-[#2D39F5]"
        >
          Transfer Again
        </button>
      </div>
    </Modal>
  );
}