import Modal from './Modal';

export default function TransferFailedModal({
  isOpen,
  onClose,
  onTryAgain,
  onBackToDashboard,
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
          src="/assets/Oh no-cuate 1.png"
          alt="Transfer Failed Illustration"
          className="w-48 h-48 object-contain"
        />

        {/* Teks gagal */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Oops Transfer <span className="text-red-500">Failed</span>
          </h2>
          <p className="text-[13px] text-gray-400">
            Sorry There's an issue for your transfer, try again later !
          </p>
        </div>

        {/* Tombol Try Again */}
        <button
          onClick={onTryAgain}
          className="w-full py-3.5 bg-[#2D39F5] text-white rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:opacity-90 transition-opacity border-none"
        >
          Try Again
        </button>

        {/* Tombol Back To Dashboard */}
        <button
          onClick={onBackToDashboard ?? onClose}
          className="w-full py-3.5 bg-white text-[#2D39F5] rounded-xl font-[inherit] text-[15px] font-bold cursor-pointer hover:bg-gray-50 transition-colors border border-[#2D39F5]"
        >
          Back To Dashboard
        </button>
      </div>
    </Modal>
  );
}