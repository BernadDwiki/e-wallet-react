const socialIcons = ["./assets/1.png", "./assets/2.png", "./assets/3.png", "./assets/4.png"];

const Footer = () => (
  <footer className="bg-[#2948ff] px-5 md:px-[120px] py-[50px]">
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-10 mb-10">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
          <img src="./assets/dompet1.png" alt="" className="w-[30px] h-[30px]" />
          E-Wallet
        </div>
        <p className="text-[13px] text-white/65 leading-[1.7]">
          Clarity gives you the blocks and components you need to create a truly professional website.
        </p>
      </div>

      {/* Get In Touch */}
      <div>
        <h4 className="text-white text-[13px] font-bold tracking-[1px] uppercase mb-4">
          Get In Touch
        </h4>
        <ul className="list-none flex flex-col gap-[10px]">
          <li className="text-white/70 text-[13px] flex items-center gap-2">
            <img src="./assets/u_phone.png" alt="" className="w-[15px] h-[15px] opacity-80 shrink-0" />
            +62 5637 8882-9901
          </li>
          <li className="text-white/70 text-[13px] flex items-center gap-2">
            <img src="./assets/mail2.png" alt="" className="w-[15px] h-[15px] opacity-80 shrink-0" />
            contact@zwallet.com
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h4 className="text-white text-[13px] font-bold tracking-[1px] uppercase mb-4">
          Social Media
        </h4>
        <div className="flex gap-[10px] mt-1">
          {socialIcons.map((src, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/25 transition-colors"
            >
              <img src={src} alt="" className="w-8 h-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-white text-[13px] font-bold tracking-[1px] uppercase mb-4">
          Newsletter
        </h4>
        <div className="flex flex-col gap-2 mt-3">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="px-[14px] py-[10px] rounded-lg border-none text-[13px] outline-none"
          />
          <button className="bg-white text-[#2948ff] border-none px-4 py-[10px] rounded-lg text-[13px] font-bold cursor-pointer hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-white pt-5 text-center text-white/50 text-xs">
      &copy; Copyright 2022. All Rights Reserved by Clarityll
    </div>
  </footer>
);

export default Footer;