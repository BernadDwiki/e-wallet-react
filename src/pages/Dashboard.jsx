import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage } from "../utils/validation";
import Modal from "../components/Modal";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import FastService from "../components/FastService";
import ChartCard from "../components/ChartCard";
import TransactionHistory from "../components/TransactionHistory";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = authStorage.getCurrentUser();
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success"
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    authStorage.logout();
    setModal({
      isOpen: true,
      title: "Logged Out",
      message: "You have been successfully logged out.",
      type: "success"
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

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
        <Topbar currentUser={currentUser} onLogout={handleLogout} />

        <div
          className="grid"
          style={{
            gridTemplateRows: "1fr",
            gridTemplateColumns: "196px 1fr",
            gridTemplateAreas: '"sidebar main"',
            minHeight: "calc(100vh - 64px)",
            marginTop: "64px",
          }}
        >
          {/* Sidebar */}
          <div style={{ gridArea: "sidebar" }}>
            <Sidebar />
          </div>

          {/* Main Content */}
          <main
            style={{
              gridArea: "main",
              padding: "24px 24px 24px 20px",
              display: "grid",
              gridTemplateColumns: "1fr 280px",
              gridTemplateRows: "auto auto 1fr",
              gap: "16px",
              alignItems: "start",
            }}
          >
            {/* Stat Cards — col 1 row 1 */}
            <div style={{ gridColumn: 1, gridRow: 1 }}>
              <StatCards />
            </div>

            {/* Fast Service — col 1 row 2 */}
            <div style={{ gridColumn: 1, gridRow: 2 }}>
              <FastService />
            </div>

            {/* Chart — col 1 row 3 */}
            <div style={{ gridColumn: 1, gridRow: 3 }}>
              <ChartCard />
            </div>

            {/* Transaction History — col 2 rows 1-3 */}
            <div style={{ gridColumn: 2, gridRow: "1 / 4" }}>
              <TransactionHistory />
            </div>
          </main>
        </div>

        {/* Bottom Nav (mobile) */}
        <BottomNav />
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
      >
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
            className="px-4 py-2 bg-[#2d39f5] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}