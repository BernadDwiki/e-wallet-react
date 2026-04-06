import { useState, useEffect, useRef } from "react";

const ASSETS = {
  logo: "./assets/dompet1.png",
  avatar: "./assets/ghaluh.png",
  chevron: "./assets/Vector(2).png",
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
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-900 hover:bg-blue-600 hover:text-white bg-blue-600 text-white"
              onClick={(e) => e.preventDefault()}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
                </svg>
              </span>
              Profile
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
              </span>
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
