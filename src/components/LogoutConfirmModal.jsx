import Modal from './Modal';

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdropClassName="top-16 left-0 right-0 bottom-0 md:left-49"
      disableBodyScroll={false}
    >
      {/* Card modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-6 p-7 flex flex-col gap-5">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">👋</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Yakin ingin keluar?
          </h2>
          <p className="text-[13px] text-gray-400">
            Anda akan keluar dari aplikasi E-Wallet.
          </p>
        </div>

        {/* Button Group */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-xl font-bold text-[15px] cursor-pointer hover:bg-gray-200 transition-colors border-none"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-[15px] cursor-pointer hover:bg-red-700 transition-colors border-none"
          >
            Keluar
          </button>
        </div>
      </div>
    </Modal>
  );
}
