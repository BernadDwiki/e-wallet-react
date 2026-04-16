import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/provider.jsx';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import TransferPage from './pages/TransferPage';
import TransferNominal from './pages/TransferNominal';
import HistoryTransaction from './pages/HistoryTransaction';
import TopUp from './pages/TopUp';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import ChangePin from './pages/ChangePin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transfer-nominal" element={<TransferNominal />} />
          <Route path="/history-transaction" element={<HistoryTransaction />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/change-pin" element={<ChangePin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;