import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/provider.jsx';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TransferPage from './pages/TransferPage';
import TransferNominal from './pages/TransferNominal';
import HistoryTransaction from './pages/HistoryTransaction';
import TopUp from './pages/TopUp';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transfer-nominal" element={<TransferNominal />} />
          <Route path="/history-transaction" element={<HistoryTransaction />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;