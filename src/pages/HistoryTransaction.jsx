import { useAuth } from "../hooks/useAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import TransactionList from "../components/TransactionList";
import BottomNav from "../components/BottomNav";

const ASSETS = "/assets";

export default function HistoryTransaction() {
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

      <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA]">
        <div className="flex items-center gap-3">
          <img
            src={`${ASSETS}/history(1).png`}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <h1 className="text-lg font-extrabold text-gray-900">History Transaction</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <TransactionList />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}