import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import Modal from '../components/Modal';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('No account found with this email address');
      }

      // Simulate sending reset email
      setModal({
        isOpen: true,
        title: 'Reset Link Sent!',
        message: 'Please check your email for password reset instructions.',
        type: 'success'
      });

      // Clear form
      setEmail('');

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
            Fill Out Form Correctly 👋
          </h1>

          <p className="mt-2 text-gray-400 mb-5">
            We will send new password to your email
          </p>

          <form onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
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
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="text-[#4a6cf7] hover:underline text-sm bg-transparent border-none cursor-pointer"
            >
              Back to Login
            </button>
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