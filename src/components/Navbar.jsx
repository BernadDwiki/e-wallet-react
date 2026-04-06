import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#2948ff] text-white px-6 md:px-[100px] py-[15px] flex justify-between items-center relative">
      {/* Logo */}
      <h4 className="text-white flex items-center gap-2 z-50">
        <img src="./assets/dompet1.png" alt="E-Wallet" className="w-[30px] h-[30px]" />
        <span className="font-semibold">E-Wallet</span>
      </h4>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        <a
          href="/login"
          className="text-white no-underline rounded-lg border border-white px-[15px] py-[10px] hover:bg-white hover:text-[#2948ff] transition-colors duration-300"
        >
          SignIn
        </a>
        <a
          href="/register"
          className="bg-white text-[#2948ff] no-underline rounded-lg border border-white px-[15px] py-[10px] hover:opacity-90 transition-opacity duration-300 font-semibold"
        >
          Sign Up
        </a>
      </nav>

      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col gap-1.5 z-50 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#2948ff] md:hidden shadow-lg animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-0 p-4">
            <a
              href="/login"
              onClick={closeMenu}
              className="text-white no-underline px-4 py-3 rounded-lg border border-white hover:bg-white hover:text-[#2948ff] transition-colors duration-300 text-center font-semibold"
            >
              SignIn
            </a>
            <a
              href="/register"
              onClick={closeMenu}
              className="mt-2 bg-white text-[#2948ff] no-underline px-4 py-3 rounded-lg border border-white hover:opacity-90 transition-opacity duration-300 text-center font-semibold"
            >
              Sign Up
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;