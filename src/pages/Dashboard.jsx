import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { getDashboardInfo } from "../services/dashboardService.js";
import { getTransactionReport } from "../services/reportService.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import FastService from "../components/FastService";
import ChartCard from "../components/ChartCard";
import TransactionHistory from "../components/TransactionHistory";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [walletData, setWalletData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState({ data: [], loading: true });
  const [days, setDays] = useState(7);
  const [flow, setFlow] = useState("both");

  const fetchTransactionReport = async (selectedDays = days, selectedFlow = flow) => {
    setChart(prev => ({ ...prev, loading: true }));

    const result = await getTransactionReport(selectedDays, selectedFlow);

    if (result.success) {
      const rawData = result.data.data;
      const groupedData = {};

      rawData.forEach((item) => {
        const formattedDate = new Date(item.date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        });

        if (!groupedData[formattedDate]) {
          groupedData[formattedDate] = {
            date: formattedDate,
            rawDate: item.date,
            income: 0,
            expense: 0,
          };
        }

        if (item.type === "income") {
          groupedData[formattedDate].income = item.total_transaction;
        }

        if (item.type === "expense") {
          groupedData[formattedDate].expense = item.total_transaction;
        }
      });

      setChart({
        data: Object.values(groupedData)
          .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
          .map((item) => ({
            rawDate: item.rawDate,
            income: item.income,
            expense: item.expense,
          })),
        loading: false,
      });
    } else {
      setChart(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      const result = await getDashboardInfo();

      if (result.success) {
        const data = result.data.data;

        setWalletData({
          balance: data.Balance || 0,
          income: data.Income || 0,
          expense: data.Expense || 0,
        });
      }

      setLoading(false);
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchTransactionReport(days, flow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, flow]);

  return (
    <>
      <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Topbar - Fixed/Independent */}
        <Topbar currentUser={currentUser} />

        <div
          className="grid grid-cols-1 md:grid-cols-[196px_1fr] min-h-[calc(100vh-64px)] mt-16"
        >
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 p-4 md:p-6">

            {/* Stat Cards — col 1 row 1 */}
            <div className="lg:col-start-1 lg:row-start-1">
              <StatCards walletData={walletData} loading={loading} />
            </div>

            {/* Fast Service — col 1 row 2 */}
            <div className="lg:col-start-1 lg:row-start-2">
              <FastService />
            </div>

            {/* Chart — col 1 row 3 */}
            <div className="lg:col-start-1 lg:row-start-3">
              <ChartCard
                data={chart.data}
                loading={chart.loading}
                days={days}
                setDays={setDays}
                flow={flow}
                setFlow={setFlow}
              />
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