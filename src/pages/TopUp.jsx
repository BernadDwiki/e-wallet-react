import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { createTopUp } from "../services/topUpService.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import Modal from "../components/Modal";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

const paymentMethods = [
  { id: "bri",   label: "Bank Rakyat Indonesia", logo: `${ASSETS}/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png`   },
  { id: "dana",  label: "Dana",                  logo: `${ASSETS}/Logo DANA (PNG-240p) - FileVector69 1.png`  },
  { id: "bca",   label: "Bank Central Asia",     logo: `${ASSETS}/Bank BCA Logo (SVG-240p) - FileVector69 1.png`   },
  { id: "gopay", label: "Gopay",                 logo: `${ASSETS}/Logo GoPay (SVG-240p) - FileVector69 1.png` },
  { id: "ovo",   label: "Ovo",                   logo: `${ASSETS}/Logo OVO.png`   },
];

/* ── MAIN CONTENT ── */
function TopUpContent() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selected, setSelected] = useLocalStorage("topup_payment_method", "bri");
  const [amount, setAmount] = useLocalStorage("topup_amount", "");
  const [note, setNote] = useLocalStorage("topup_note", "");
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });
  const paymentMethodIds = {
    bri: 1,
    dana: 2,
    bca: 3,
    gopay: 4,
    ovo: 5,
  };
  const feeEstimates = {
    bri: { adminFee: 1500,  taxPercent: 0.05 }, // Bank Rakyat Indonesia
    dana: { adminFee: 1000, taxPercent: 0.03 }, // Dana
    bca: { adminFee: 1200, taxPercent: 0.04 }, // Bank Central Asia
    gopay: { adminFee: 800,  taxPercent: 0.02 }, // GoPay
    ovo: { adminFee: 900, taxPercent: 0.03 }, // OVO
    default: { adminFee: 1500, taxPercent: 0.05 },
  };
  const { adminFee, taxPercent } = feeEstimates[selected] || feeEstimates.default;
  const order = parseInt(amount.replace(/\D/g, "")) || 0;
  const taxAmount = Math.round(order * taxPercent);
  const totalPayment = order + adminFee + taxAmount;

  const fmt = (n) =>
    "Idr. " + n.toLocaleString("id-ID");

  const handleSubmit = async () => {
    if (order <= 0) {
      setModal({
        isOpen: true,
        title: "Invalid Amount",
        message: "Masukkan nominal top-up yang valid.",
        type: "error"
      });
      return;
    }

    if (!note.trim()) {
      setModal({
        isOpen: true,
        title: "Note Required",
        message: "Masukkan catatan top-up terlebih dahulu.",
        type: "error"
      });
      return;
    }

    setIsSaving(true);

    const result = await createTopUp({
      amount: order,
      note,
      payment_method_id: paymentMethodIds[selected],
    });

    setIsSaving(false);

    if (result.success) {
      navigate('/topup-success', { state: result.data.data });
      return;
    }

    setModal({
      isOpen: true,
      title: "Topup Failed",
      message: result.message || "Gagal melakukan topup.",
      type: "error"
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA] overflow-auto">
      {/* Page Header */}
      <div className="flex items-center gap-2.5">
        <img
          src={`${ASSETS}/Upload(1).png`}
          alt=""
          className="w-5 h-5 object-contain"
        />
        <h1 className="text-[18px] font-extrabold text-gray-900">
          Top Up Account
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5 items-start">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-5">

          {/* Account Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-[15px] font-bold text-gray-900 mb-3.5">
              Account Information
            </p>
            <div className="flex items-center gap-3.5 bg-gray-100 rounded-xl px-4 py-3.5">
              <img
                src={`${ASSETS}/ghaluh.png`}
                alt={currentUser?.name || "User"}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">
                  {currentUser?.name || "Guest User"}
                </span>
                <span className="text-[13px] text-gray-500">
                  {currentUser?.phone || currentUser?.phone_number || "-"}
                </span>
                <img
                  src={`${ASSETS}/Sidenav item.png`}
                  alt="Verified"
                  className="h-5 w-auto object-contain mt-0.5"
                />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-[15px] font-bold text-gray-900 mb-1.5">
              Amount
            </p>
            <p className="text-[13px] text-gray-400 mb-3.5">
              Type the amount you want to transfer to your e-wallet account.
            </p>
            <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-[#2D39F5] transition-colors">
              <img
                src={`${ASSETS}/u_money-bill.png`}
                alt=""
                className="w-4.5 h-4.5 object-contain opacity-50 shrink-0"
              />
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Nominal Top Up"
                className="border-none outline-none text-sm text-gray-900 flex-1 bg-transparent placeholder-gray-400 font-[inherit]"
              />
            </div>
          </div>

          {/* Note */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-[15px] font-bold text-gray-900 mb-1.5">
              Note
            </p>
            <p className="text-[13px] text-gray-400 mb-3.5">
              Add a note for your top up transaction.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter Top Up Note"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 font-[inherit] text-sm text-gray-900 resize-y outline-none min-h-30 placeholder-gray-400 focus:border-[#2D39F5] transition-colors"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-[15px] font-bold text-gray-900 mb-1.5">
              Payment Method
            </p>
            <p className="text-[13px] text-gray-400 mb-3.5">
              Choose your payment method for top up account.
            </p>
            <div className="flex flex-col gap-2.5">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`flex items-center gap-3.5 border rounded-xl px-4 py-3.5 cursor-pointer transition-colors
                    ${
                      selected === pm.id
                        ? "border-[#2D39F5] bg-[#EEF0FF]"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selected === pm.id}
                    onChange={() => setSelected(pm.id)}
                    className="w-4 h-4 shrink-0 cursor-pointer accent-[#2D39F5]"
                  />
                  <img
                    src={pm.logo}
                    alt={pm.label}
                    className="w-12 h-6 object-contain shrink-0"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    {pm.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Payment Summary ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <p className="text-[15px] font-bold text-gray-900 mb-3.5">Payment</p>

          <div className="flex flex-col gap-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-500">Amount</span>
              <span className="text-[13px] font-semibold text-gray-900">
                {fmt(order)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-500">Admin Fee</span>
              <span className="text-[13px] font-semibold text-gray-900">
                {fmt(adminFee)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-500">Tax</span>
              <span className="text-[13px] font-semibold text-gray-900">
                {taxPercent * 100}%
              </span>
            </div>
          </div>

          <hr className="border-gray-200 mb-3.5" />

          <div className="flex justify-between items-center mb-5">
            <span className="text-[13px] text-gray-500">Total Payment</span>
            <span className="text-[15px] font-extrabold text-gray-900">
              {fmt(totalPayment)}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSaving || order <= 0}
            className="w-full py-3.5 bg-[#2D39F5] text-white text-sm font-bold rounded-xl cursor-pointer hover:opacity-90 transition-opacity border-none mb-3 disabled:opacity-50"
          >
            {isSaving ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>

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
    </main>
  );
}

/* ── ROOT APP SHELL ── */
export default function TopUp() {
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
      <TopUpContent />

      {/* Bottom Nav (mobile) */}
      <BottomNav />
    </div>
  );
}