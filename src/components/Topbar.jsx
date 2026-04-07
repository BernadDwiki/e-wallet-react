import { useState, useEffect, useRef } from "react";

const ASSETS = {
  logo: "./assets/dompet1.png",
  avatar: "./assets/ghaluh.png",
  chevron: "./assets/Vector(2).png",
  profile: "./assets/2 User.png",
  logout: "./assets/Log Out.png",
};

/**
 * Komponen bar navigasi atas dengan logo, menu pengguna, dan fungsi logout.
 *
 * @param {object} currentUser - Objek pengguna yang sedang login.
 * @param {function} onLogout - Fungsi yang dipanggil saat pengguna logout.
 * @returns {JSX.Element} Komponen topbar.
 */
export default function Topbar({ currentUser, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between px-7 h-16 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center gap-2 no-underline font-extrabold text-[17px] text-[#3b4afa]">
        <img src={ASSETS.logo} alt="E-Wallet Logo" className="w-7 h-7 object-contain" />
        E-Wallet
      </div>

      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center gap-2.5 rounded-full transition-colors hover:bg-gray-100 px-2 py-1"
        >
          <span className="text-sm font-semibold text-gray-800 hidden sm:block">{currentUser?.name || 'User'}</span>
          <img src={ASSETS.avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
          <img src={ASSETS.chevron} alt="Expand" className={`w-4 h-4 object-contain opacity-45 transition-transform ${menuOpen ? "rotate-180" : "rotate-0"}`} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <a
              href="#"
              className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-colors">
                <img src={ASSETS.profile} alt="Profile icon" className="w-4 h-4 object-contain" />
              </span>
              Profile
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="group flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-colors">
                <img src={ASSETS.logout} alt="Logout icon" className="w-4 h-4 object-contain" />
              </span>
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
