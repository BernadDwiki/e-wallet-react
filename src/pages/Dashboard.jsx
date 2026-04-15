import { useRequireAuth } from "../hooks/useRequireAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import FastService from "../components/FastService";
import ChartCard from "../components/ChartCard";
import TransactionHistory from "../components/TransactionHistory";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
  const currentUser = useRequireAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4a6cf7] to-[#2d46c0]">
        <div className="text-white text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Topbar - Fixed/Independent */}
        <Topbar currentUser={currentUser} />

        <div
          className="grid grid-cols-1 md:grid-cols-[196px_1fr] min-h-[calc(100vh-64px)] mt-[64px]"
        >
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 p-4 md:p-6">

            {/* Stat Cards — col 1 row 1 */}
            <div className="lg:col-start-1 lg:row-start-1">
              <StatCards />
            </div>

            {/* Fast Service — col 1 row 2 */}
            <div className="lg:col-start-1 lg:row-start-2">
              <FastService />
            </div>

            {/* Chart — col 1 row 3 */}
            <div className="lg:col-start-1 lg:row-start-3">
              <ChartCard />
            </div>

            {/* Transaction History — col 2 rows 1-3 */}
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3">
              <TransactionHistory />
            </div>
          </main>
        </div>

        {/* Bottom Nav (mobile) */}
        <BottomNav />
      </div>
    </>
  );
}