import { NavLink } from "react-router-dom";

const ASSETS = {
  dashboard: "./assets/dashboard-two.png",
  send: "./assets/Send.png",
  history: "./assets/history.png",
  upload: "./assets/Upload.png",
  user: "./assets/2 User.png",
};

export default function BottomNav() {
  const items = [
    { href: "/dashboard", icon: ASSETS.dashboard },
    { href: "/transfer", icon: ASSETS.send },
    { href: "/history-transaction", icon: ASSETS.history },
    { href: "/top-up", icon: ASSETS.upload },
    { href: "/profile", icon: ASSETS.user },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50 flex">
      {items.map((item, i) => (
        <NavLink
          key={i}
          to={item.href}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center no-underline transition-colors ${
              isActive ? "bg-[#2d39f5] text-white" : "text-gray-400 hover:text-gray-600"
            }`
          }
        >
          {({ isActive }) => (
            <img
              src={item.icon}
              alt=""
              className="w-5 h-5 object-contain"
              style={
                isActive
                  ? { filter: "brightness(0) invert(1)" }
                  : { filter: "brightness(0)" }
              }
            />
          )}
        </NavLink>
      ))}
    </nav>
  );
}
