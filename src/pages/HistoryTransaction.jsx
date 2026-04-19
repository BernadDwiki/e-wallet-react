import { useAuth } from "../hooks/useAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import TransactionList from "../components/TransactionList";
import BottomNav from "../components/BottomNav";

export default function HistoryTransaction() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Topbar currentUser={currentUser} />

      <div className="pt-16 flex">
        <Sidebar />

        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <h1 className="text-xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-600 text-sm">View and manage all your transactions</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <TransactionList />
            </div>
          </div>
        </main>
        {/* Bottom Nav (mobile) */}
        <BottomNav />
      </div>
    </div>
  );
}