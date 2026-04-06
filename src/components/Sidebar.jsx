import { NavLink, useLocation } from "react-router-dom"; 

const ASSETS = {
  dashboard: "./assets/dashboard-two.png",
  send: "./assets/Send.png",
  history: "./assets/history.png",
  upload: "./assets/Upload.png",
  user: "./assets/2 User.png",
  logout: "./assets/Log Out.png",
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: ASSETS.dashboard, href: "/dashboard", danger: false },
  { label: "Transfer", icon: ASSETS.send, href: "/transfer", danger: false },
  { label: "History", icon: ASSETS.history, href: "/history-transaction", danger: false },
  { label: "Top Up", icon: ASSETS.upload, href: "/top-up", danger: false },
  { label: "Profile", icon: ASSETS.user, href: "/edit-profile", danger: false },
  { label: "Keluar", icon: ASSETS.logout, logout: true, danger: true },
];

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  return (
    <aside className="hidden md:flex bg-white border-r border-gray-200 py-4 flex-col gap-0.5 sticky top-16 h-[calc(100vh-64px)] w-[196px]">
      {NAV_ITEMS.map((item) => {
        const isTransferItem = item.href === "/transfer";
        const transferActive = isTransferItem && ["/transfer", "/transfer-nominal", "/transfer-pin"].includes(location.pathname);

        if (item.logout) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2.5 py-2.5 px-4 text-sm font-medium rounded-[10px] mx-2.5 text-red-600 hover:bg-red-50 transition-colors"
            >
              <img
                src={item.icon}
                alt=""
                className="w-[18px] h-[18px] object-contain flex-shrink-0"
              />
              {item.label}
            </button>
          );
        }

        return (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === "/dashboard"}
            className={({ isActive }) => {
              const active = isActive || transferActive;
              return [
                "flex items-center gap-2.5 py-2.5 px-4 text-sm font-medium rounded-[10px] mx-2.5 no-underline transition-colors",
                active
                  ? "bg-[#2d39f5] text-white font-bold"
                  : item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              ].join(" ");
            }}
          >
            <img
              src={item.icon}
              alt=""
              className={`w-[18px] h-[18px] object-contain flex-shrink-0 ${location.pathname === item.href || transferActive ? "filter brightness-0 invert" : "filter brightness-0"}`}
            />
            {item.label}
          </NavLink>
        );
      })}
    </aside>
  );
}
