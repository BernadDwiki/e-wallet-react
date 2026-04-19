import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validation.js";
import { useAuth } from "../hooks/useAuth.js";
import Modal from "../components/Modal";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error" // error, success, info
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const newErrors = validateLoginForm({
      ...formData,
      [name]: value
    });
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = validateLoginForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Fake authentication using localStorage
      const user = await login(formData.email, formData.password);

      setModal({
        isOpen: true,
        title: "Login Successful!",
        message: `Welcome back, ${user.name || user.email.split('@')[0]}!`,
        type: "success"
      });

      // Check if user has PIN, if not redirect to enter PIN
      setTimeout(() => {
        if (!user.pin) {
          navigate("/auth/enter-pin");
        } else {
          navigate("/dashboard");
        }
      }, 2000);

    } catch (err) {
      setModal({
        isOpen: true,
        title: "Login Failed",
        message: err.message,
        type: "error"
      });
    }
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <main className="flex h-screen bg-linear-to-br from-[#4a6cf7] to-[#2d46c0]">
        {/* LEFT SIDE */}
        <section className="w-1/2 bg-white px-20 py-16 flex flex-col justify-center rounded-tr-[40px] rounded-br-[40px] max-[768px]:w-full max-[768px]:rounded-none max-[768px]:px-6 max-[768px]:py-8">

          {/* Logo */}
          <h4 className="text-primary flex items-center gap-2 font-bold mb-4">
            <img src="/assets/dompet1.png" alt="E-Wallet Logo" className="w-7 h-7" />
            E-Wallet
          </h4>

          {/* Heading */}
          <h1 className="text-2xl font-bold mb-4 max-[768px]:text-lg max-[480px]:text-base">
            Hello Welcome Back 👋
          </h1>

          {/* Description */}
          <p className="text-gray-500 mb-5 text-sm max-[480px]:text-xs">
            Fill out the form correctly or you can login with several option.
          </p>

          {/* Google Button */}
          <button className="btn-social mb-2.5 max-[480px]:text-sm max-[480px]:py-2.5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign In With Google
          </button>

          {/* Facebook Button */}
          <button className="btn-social mb-2.5 max-[480px]:text-sm max-[480px]:py-2.5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            Sign In With Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4 text-gray-400">
            <hr className="flex-1 border-none h-px bg-[#dedede]" />
            <span className="text-sm">or</span>
            <hr className="flex-1 border-none h-px bg-[#dedede]" />
          </div>

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleLogin}>
            {/* Email */}
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative w-full mb-3">
              <img
                src="/assets/mail.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                alt="Email Icon"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

            {/* Password */}
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative w-full mb-3">
              <img
                src="/assets/Password.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                alt="Password Icon"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <img
                src="/assets/EyeSlash.png"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                alt="Toggle Password Visibility"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

            {/* Forgot Password Link */}
            <div className="text-right mb-4">
              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="text-[#4a6cf7] hover:underline text-sm bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full max-[480px]:text-sm max-[480px]:py-2.5"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Not Have An Account?{" "}
            <a href="/auth/register" className="text-primary no-underline hover:underline font-medium">
              Register
            </a>
          </p>

        </section>

        {/* RIGHT SIDE */}
        <section className="w-1/2 flex justify-center items-center max-[768px]:hidden">
          <img src="/assets/login1.png" alt="Login Illustration" className="w-150 max-w-full" />
        </section>
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