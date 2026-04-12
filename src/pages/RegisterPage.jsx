import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegisterForm, authStorage } from "../utils/validation";
import Modal from "../components/Modal";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const newErrors = validateRegisterForm({
      ...formData,
      [name]: value,
    });
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = validateRegisterForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Fake registration using localStorage
      const newUser = authStorage.register({
        email: formData.email,
        password: formData.password,
        name: formData.email.split("@")[0], // Simple name extraction
      });

      setModal({
        isOpen: true,
        title: "Registration Successful!",
        message: `Welcome ${newUser.name}! Your account has been created successfully.`,
        type: "success",
      });

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Registration Failed",
        message: err.message,
        type: "error",
      });
    }
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <main className="flex h-screen bg-white lg:bg-gradient-to-br lg:from-[#4a6cf7] lg:to-[#2d46c0] max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center">
        {/* LEFT SIDE */}
        <section className="w-1/2 bg-white px-16 py-8 flex flex-col justify-center rounded-tr-[40px] rounded-br-[40px] max-[768px]:w-full max-[768px]:rounded-none max-[768px]:px-6 max-[768px]:py-8 max-[480px]:px-4 max-[480px]:py-6">
          {/* Logo */}
          <h4 className="text-primary flex items-center gap-2 font-bold text-sm mb-2">
            <img src="/assets/dompet1.png" alt="" className="w-7 h-7" />
            <span>E-Wallet</span>
          </h4>

          {/* Heading */}
          <h1 className="text-xl font-bold mb-2 leading-snug">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h1>

          {/* Description */}
          <p className="text-gray-500 mb-3 text-xs leading-relaxed">
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>

          {/* Google Button */}
          <button className="btn-social mb-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign In With Google
          </button>

          {/* Facebook Button */}
          <button className="btn-social mb-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            Sign In With Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center my-3 text-gray-400 gap-4">
            <hr className="flex-1 border-none h-px bg-[#dedede]" />
            <span className="text-sm">or</span>
            <hr className="flex-1 border-none h-px bg-[#dedede]" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister}>
            {/* Email */}
            <label htmlFor="email" className="block text-sm mb-0.5">
              Email
            </label>
            <div className="relative w-full mb-2.5">
              <img
                src="/assets/mail.png"
                alt="Email Icon"
                className="absolute left-2.5 top-[50%] -translate-y-1/2 mt-1 w-5 h-5"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full mt-2 px-9 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mb-2">{errors.email}</p>
            )}

            {/* Password */}
            <label htmlFor="password" className="block text-sm mb-0.5">
              Password
            </label>
            <div className="relative w-full mb-2.5">
              <img
                src="/assets/Password.png"
                alt="Password Icon"
                className="absolute left-2.5 top-[50%] -translate-y-1/2 mt-1 w-5 h-5"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full mt-2 px-9 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-all ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              <img
                src="/assets/EyeSlash.png"
                alt="Toggle Password"
                className="absolute right-2.5 top-[50%] -translate-y-1/2 mt-1 w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mb-2">{errors.password}</p>
            )}

            {/* Confirm Password */}
            <label htmlFor="confirmPassword" className="block text-sm mb-0.5">
              Confirm Password
            </label>
            <div className="relative w-full mb-2.5">
              <img
                src="/assets/Password.png"
                alt="Password Icon"
                className="absolute left-2.5 top-[50%] -translate-y-1/2 mt-1 w-5 h-5"
              />
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter Your Password Again"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full mt-2 px-9 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-all ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
              />
              <img
                src="/assets/EyeSlash.png"
                alt="Toggle Confirm Password"
                className="absolute right-2.5 top-[50%] -translate-y-1/2 mt-1 w-5 h-5 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mb-2">
                {errors.confirmPassword}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full max-[480px]:text-sm max-[480px]:py-2.5"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-3 text-sm">
            Have An Account?{" "}
            <a
              href="/auth/login"
              className="text-primary no-underline hover:underline"
            >
              Login
            </a>
          </p>
        </section>

        {/* RIGHT SIDE */}
        <section className="w-1/2 flex justify-center items-center max-[768px]:hidden">
          <img
            src="/assets/wallet.png"
            alt="wallet"
            className="w-[550px] max-w-full"
          />
        </section>
      </main>

      {/* Modal */}
      <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
        <div
          className={`p-4 rounded-lg ${
            modal.type === "success"
              ? "bg-green-50 text-green-800"
              : modal.type === "error"
                ? "bg-red-50 text-red-800"
                : "bg-blue-50 text-blue-800"
          }`}
        >
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
