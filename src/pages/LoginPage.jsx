import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateLoginForm } from "../utils/validation.js";
import { login as loginAction } from "../store/slice/authSlice.js";
import { loginUser, getProfile } from "../services/authService.js";
import Modal from "../components/Modal";
 
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
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

    setLoading(true);
    setApiError("");

    const result = await loginUser(formData);
    setLoading(false);

    if (!result.success) {
      setApiError(result.message);
      setModal({
        isOpen: true,
        title: "Login Failed",
        message: result.message,
        type: "error"
      });
      return;
    }


    const response = result.data;

    const token =
      response.data.token;

    const hasPin =
      response.data.has_pin === true;

    // simpan token dulu
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "has_pin",
      String(hasPin)
    );

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    // ambil profile user
    const profileResult =
      await getProfile();

    if (profileResult.success) {
      const user =
        profileResult.data.data;

      const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number:
          user.phone_number,
        // also include `phone` for existing components that expect `currentUser.phone`
        phone: user.phone_number,
        picture: user.picture,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(sessionUser)
      );

      dispatch(
        loginAction(sessionUser)
      );
    }

    setModal({
      isOpen: true,
      title: "Login Successful!",
      message: "Login success",
      type: "success",
    });

    setTimeout(() => {
      navigate(
        hasPin ? "/dashboard" : "/enter-pin"
      );
    }, 1000);
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

            {apiError && (
              <p className="text-red-500 text-sm mb-3">{apiError}</p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full max-[480px]:text-sm max-[480px]:py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Login"}
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