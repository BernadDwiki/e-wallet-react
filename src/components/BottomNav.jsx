const ASSETS = {
  dashboard: "./assets/dashboard-two.png",
  send: "./assets/Send.png",
  history: "./assets/history.png",
  upload: "./assets/Upload.png",
  user: "./assets/2 User.png",
};

export default function BottomNav() {
  const items = [
    { href: "#", icon: ASSETS.dashboard, active: true },
    { href: "#", icon: ASSETS.send, active: false },
    { href: "#", icon: ASSETS.history, active: false },
    { href: "#", icon: ASSETS.upload, active: false },
    { href: "#", icon: ASSETS.user, active: false },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50 flex">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          className={`flex-1 flex flex-col items-center justify-center no-underline transition-colors ${
            item.active ? "text-[#2d39f5]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <img
            src={item.icon}
            alt=""
            className="w-5 h-5 object-contain"
            style={
              item.active
                ? { filter: "invert(25%) sepia(98%) saturate(2000%) hue-rotate(224deg) brightness(95%)" }
                : {}
            }
          />
        </a>
      ))}
    </nav>
  );
}
