import { useLayoutEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRequireAuth } from "../hooks/useRequireAuth.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const PEOPLE = [
  { id: 1, name: "Ghaluh 1", phone: "(239) 555–0108", avatar: "../assets/prof3/Rectangle 648.png", highlighted: true },
  { id: 2, name: "Ghaluh 2", phone: "(480) 555–0103", avatar: "../assets/prof3/Rectangle 648-1.png", highlighted: false },
  { id: 3, name: "Ghaluh 3", phone: "(225) 555–0118", avatar: "../assets/prof3/Rectangle 648-2.png", highlighted: true },
  { id: 4, name: "Ghaluh 4", phone: "(406) 555–0120", avatar: "../assets/prof3/Rectangle 648-3.png", highlighted: false },
  { id: 5, name: "Ghaluh 5", phone: "(303) 555–0105", avatar: "../assets/prof3/Rectangle 648-4.png", highlighted: true },
  { id: 6, name: "Ghaluh 6", phone: "(808) 555–0111", avatar: "../assets/prof3/Rectangle 648-5.png", highlighted: false },
  { id: 7, name: "Ghaluh 7", phone: "(671) 555–0110", avatar: "../assets/prof3/Rectangle 648-6.png", highlighted: true },
  { id: 8, name: "Ghaluh 8", phone: "(270) 555–0117", avatar: "../assets/prof3/Rectangle 648-7.png", highlighted: false },
];

export default function TransferPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useRequireAuth();
  const [search, setSearch] = useLocalStorage("transfer_search", searchParams.get('search') || "");
  const [starred, setStarred] = useLocalStorage("transfer_starred", {});

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const filtered = PEOPLE.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  const toggleStar = (id) =>
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSearchChange = (value) => {
    setSearch(value);
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Topbar currentUser={currentUser} />

      <div className="grid grid-cols-1 md:grid-cols-[196px_1fr]" style={{ gridTemplateRows: "1fr", gridTemplateAreas: '"sidebar main"', minHeight: "calc(100vh - 64px)", marginTop: "64px" }}>
        <div className="hidden md:block" style={{ gridArea: "sidebar" }}>
          <Sidebar />
        </div>

        <main
          style={{
            gridArea: "main",
            padding: "24px 24px 24px 20px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto auto 1fr",
            gap: "16px",
            alignItems: "start",
          }}
        >

          {/* Page Header */}
          <div className="flex items-center gap-2.5">
            <img src="../assets/Send-2.png" alt="Transfer Icon" className="w-[22px] h-[22px] object-contain" />
            <h1 className="text-lg font-extrabold text-gray-900">Transfer Money</h1>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2D39F5] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
              <span className="text-[13px] font-semibold text-gray-900">Find People</span>
            </div>
            <div className="flex-1 max-w-[80px] mx-2.5 border-t-2 border-dashed border-gray-300" />
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/transfer-nominal')}>
              <div className="w-6 h-6 rounded-full bg-gray-300 hover:bg-[#2D39F5] text-gray-500 hover:text-white text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors">2</div>
              <span className="text-[13px] font-semibold text-gray-400 hover:text-gray-900 transition-colors">Set Nominal</span>
            </div>
            <div className="flex-1 max-w-[80px] mx-2.5 border-t-2 border-dashed border-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">3</div>
              <span className="text-[13px] font-semibold text-gray-400">Finish</span>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex-1">

            {/* Find People Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
              <div>
                <div className="text-base font-bold text-gray-900 mb-1">Find People</div>
                <div className="text-xs text-gray-400">
                  {filtered.length} Result Found For Ghaluh
                </div>
              </div>

              {/* Search Box */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-[9px] min-w-[240px] bg-white">
                <input
                  type="text"
                  placeholder="Enter Number Or Full Name"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="flex-1 border-none outline-none text-[13px] text-gray-900 bg-transparent placeholder-gray-400"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                <img src="../assets/Search.png" alt="Search" className="w-4 h-4 object-contain opacity-50 flex-shrink-0" />
              </div>
            </div>

            {/* People Table */}
            <table className="w-full border-collapse">
              <tbody>
                {filtered.map((person) => (
                  <tr
                    key={person.id}
                    className={`border-b border-gray-200 last:border-b-0 cursor-pointer transition-colors hover:bg-gray-100
                      ${person.highlighted ? "bg-[#EEF0FF]" : "bg-white"}`}
                  >
                    {/* Avatar */}
                    <td className="w-[60px] py-3 pr-2 pl-0">
                      <div onClick={() => navigate('/transfer-nominal')} className="cursor-pointer">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-11 h-11 rounded-[10px] object-cover block"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4 text-center text-sm font-semibold text-gray-900">
                      {person.name}
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4 text-[13px] text-gray-500">
                      {person.phone}
                    </td>

                    {/* Star */}
                    <td className="w-11 py-3 pl-2 pr-0 text-right">
                      <button
                        onClick={() => toggleStar(person.id)}
                        className="bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-gray-100 flex items-center justify-center ml-auto"
                      >
                        <img
                          src="../assets/Star.png"
                          alt="Favourite"
                          className={`w-[18px] h-[18px] object-contain transition-opacity ${starred[person.id] ? "opacity-100" : "opacity-40"}`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                      Tidak ada hasil ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Bottom Nav (mobile) */}
      <BottomNav />
    </div>
  );
}