import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const formatRupiah = (value) =>
  `Rp${Number(value).toLocaleString('id-ID')}`;

export default function TopUpSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const topUpData = location.state;

  useEffect(() => {
    if (!topUpData) {
      navigate('/dashboard', { replace: true });
    }
  }, [topUpData, navigate]);

  if (!topUpData) {
    return null;
  }

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

      <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA] relative">
        <div className="flex items-center gap-2.5">
          <img src="/assets/Upload(1).png" alt="Top Up Success" className="w-5 h-5 object-contain" />
          <h1 className="text-lg font-extrabold text-gray-900">Top Up Success</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col gap-7 max-w-3xl w-full">
          <div className="text-base font-bold text-gray-900">Transaction Details</div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Transaction ID</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{topUpData.transaction_id}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Status</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{topUpData.status}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{formatRupiah(topUpData.amount)}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Admin Fee</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{formatRupiah(topUpData.admin_fee)}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Tax</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{Number(topUpData.tax_percent) * 100}%</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">Total Payment</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{formatRupiah(topUpData.total)}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Message</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">{topUpData.message}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto p-3.5 bg-[#2D39F5] text-white rounded-xl font-[inherit] text-[15px] font-bold hover:opacity-90 transition-opacity border-none"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/top-up')}
              className="w-full sm:w-auto p-3.5 bg-white text-[#2D39F5] rounded-xl font-[inherit] text-[15px] font-bold hover:bg-gray-100 transition-colors border border-[#2D39F5]"
            >
              Top Up Again
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

