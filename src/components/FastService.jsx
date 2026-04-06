const ASSETS = {
  topupIcon: "./assets/u_money-insert.png",
  sendWhite: "./assets/Send-white.png",
};

export default function FastService() {
  return (
    <div className="bg-white rounded-[14px] border border-gray-200 px-5 py-4 flex items-center justify-between flex-wrap gap-3">
      <span className="text-[15px] font-bold">Fast Service</span>
      <div className="flex gap-2.5">
        {[
          { label: "Top Up", icon: ASSETS.topupIcon },
          { label: "Transfer", icon: ASSETS.sendWhite },
        ].map((btn) => (
          <button
            key={btn.label}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2d39f5] text-white text-[13px] font-bold border-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src={btn.icon}
              alt=""
              className="w-4 h-4 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
