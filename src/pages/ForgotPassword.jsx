import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation';
import { AuthContext } from '../contexts/auth/context.js';
import Modal from '../components/Modal';

function ForgotPassword() {
  const navigate = useNavigate();
  const { users, updateUser } = useContext(AuthContext);
  const [step, setStep] = useState(1); // 1: email, 2: new password
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });
  const [foundUser, setFoundUser] = useState(null);

  const handleInputChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
      if (error) setError('');
    } else if (field === 'newPassword') {
      setNewPassword(value);
      // Real-time validation for new password
      const passwordError = validatePassword(value);
      setErrors(prev => ({
        ...prev,
        newPassword: passwordError
      }));
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
      // Real-time validation for confirm password
      if (value && value !== newPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Check if user exists from AuthContext users
      const found = users.find((u) => u.email === email);

      if (!found) {
        throw new Error('No account found with this email address');
      }

      setFoundUser(found);
      setStep(2);

    } catch (err) {
      setModal({
        isOpen: true,
        title: 'Error',
        message: err.message,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    // Check for validation errors
    const passwordError = validatePassword(newPassword);
    const confirmError = newPassword !== confirmPassword ? 'Passwords do not match' : '';

    if (passwordError || confirmError) {
      setErrors({
        newPassword: passwordError,
        confirmPassword: confirmError
      });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Update password using context
      const updatedUser = { ...foundUser, password: newPassword };
      updateUser(updatedUser);

      setModal({
        isOpen: true,
        title: 'Password Updated!',
        message: 'Your password has been successfully changed. You can now login with your new password.',
        type: 'success'
      });

    } catch (err) {
      setModal({
        isOpen: true,
        title: 'Error',
        message: err.message,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
    if (modal.type === 'success') {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#3969FD] flex justify-center items-center">
        <div className="w-[500px] max-w-[90vw] bg-white rounded-[30px] p-[50px]">

          <h4 className="text-[#4a6cf7] flex items-center gap-2 font-bold text-lg">
            <img
              src="/assets/dompet1.png"
              alt="E-Wallet"
              className="w-[30px] h-[30px] mb-2"
            />
            <span>E-Wallet</span>
          </h4>

          <h1 className="mt-5 text-2xl font-bold mb-4">
            {step === 1 ? 'Fill Out Form Correctly 👋' : 'Set New Password 🔒'}
          </h1>

          <p className="mt-2 text-gray-400 mb-5">
            {step === 1 
              ? 'Enter your email address to reset your password'
              : 'Create a new secure password for your account'
            }
          </p>

          {step === 1 ? (
            <form onSubmit={handleSubmitEmail}>
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <div className="relative mt-2 mb-2">
                <img
                  src="/assets/mail.png"
                  alt="mail"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
                />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  id="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full h-10 pl-10 pr-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2948FF] focus:border-transparent transition-all ${
                    error ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-3 w-full py-3 bg-[#2948FF] hover:bg-[#1a35e0] transition-colors text-white font-semibold rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Checking...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitPassword}>
              <label htmlFor="newPassword" className="text-sm font-semibold">
                New Password
              </label>
              <div className="relative mt-2 mb-2">
                <img
                  src="/assets/Password.png"
                  alt="lock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className={`w-full h-10 pl-10 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2948FF] focus:border-transparent transition-all ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                <img
                  src="/assets/EyeSlash.png"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer opacity-40 hover:opacity-60"
                  alt="Toggle Password Visibility"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.newPassword && <p className="text-red-500 text-xs mb-2">{errors.newPassword}</p>}

              <label htmlFor="confirmPassword" className="text-sm font-semibold">
                Confirm New Password
              </label>
              <div className="relative mt-2 mb-2">
                <img
                  src="/assets/Password.png"
                  alt="lock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full h-10 pl-10 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2948FF] focus:border-transparent transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                <img
                  src="/assets/EyeSlash.png"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer opacity-40 hover:opacity-60"
                  alt="Toggle Password Visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mb-2">{errors.confirmPassword}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-3 w-full py-3 bg-[#2948FF] hover:bg-[#1a35e0] transition-colors text-white font-semibold rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="text-[#4a6cf7] hover:underline text-sm bg-transparent border-none cursor-pointer"
              >
                Back to Login
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setNewPassword('');
                  setConfirmPassword('');
                  setError('');
                }}
                className="text-[#4a6cf7] hover:underline text-sm bg-transparent border-none cursor-pointer"
              >
                Back to Email
              </button>
            )}
          </div>
        </div>
      </main>

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
            className="px-4 py-2 bg-[#4a6cf7] text-white rounded-lg hover:bg-[#3a5ce6] transition-colors"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ForgotPassword;