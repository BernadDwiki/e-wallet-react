import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function EnterPin() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pins, setPins] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Redirect if not logged in or already has PIN
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/login");
    } else if (currentUser.pin) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newPins = [...pins];
    newPins[index] = value;
    setPins(newPins);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newPins = [...pins];
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) newPins[i] = char;
    });
    setPins(newPins);
    const nextEmpty = newPins.findIndex((p) => p === "");
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleSubmit = () => {
    const pin = pins.join("");
    if (pin.length < 6) {
      alert("Please enter all 6 digits.");
      return;
    }

    // Save PIN to user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex].pin = pin;
      localStorage.setItem('users', JSON.stringify(users));
    }

    alert(`PIN saved successfully!`);
    navigate("/dashboard");
  };

  const isComplete = pins.every((p) => p !== "");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 py-16 md:px-24">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/assets/dompet1.png" alt="" className="w-8 h-8" />
          <span className="text-indigo-500 font-bold text-lg">E-Wallet</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Enter Your Pin 👋
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Please save your pin because this is important for your account security.
        </p>

        {/* PIN Inputs */}
        <div className="flex gap-3 mb-10" onPaste={handlePaste}>
          {pins.map((pin, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={pin}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`
                w-full h-12 text-center text-2xl font-bold border-b-2 bg-transparent
                outline-none transition-colors duration-200
                ${pin
                  ? "border-indigo-500 text-indigo-500"
                  : "border-gray-200 text-gray-800"
                }
                focus:border-indigo-500
              `}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`
            w-full py-3 rounded-xl text-white font-semibold text-sm
            transition-all duration-200
            ${isComplete
              ? "bg-indigo-500 hover:bg-indigo-600 active:scale-95"
              : "bg-indigo-300 cursor-not-allowed"
            }
          `}
          disabled={!isComplete}
        >
          Submit
        </button>

        {/* Forgot PIN */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Forgot Your Pin?{" "}
          <a href="#" className="text-indigo-500 font-semibold hover:underline">
            Reset
          </a>
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-indigo-500 to-indigo-700 items-center justify-center">
        <img src="/assets/enterpin1.png" alt="" className="w-149" />
      </div>

    </div>
  );
}