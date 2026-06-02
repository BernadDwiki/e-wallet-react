import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSelectedPerson } from '../store/slice/transferSlice.js';
import { getReceivers } from '../services/receiverService.js';
import { useAuth } from "../hooks/useAuth.js";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";



export default function TransferPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [receivers, setReceivers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [starred, setStarred] = useState({});

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const fetchReceivers = async () => {
    setLoading(true);

    const result = await getReceivers({
      search,
      page,
      limit: 5,
    });

    if (result.success) {
      const data = result.data.data;

      setReceivers(data.items);

      setPagination({
        page: data.page,
        total: data.total,
        nextPage: data.next_page,
        prevPage: data.prev_page,
      });
    }

    setLoading(false);
  };

  // Fetch on page change
  useEffect(() => {
    fetchReceivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchReceivers();
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleStar = (id) =>
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSelectReceiver = (receiver) => {
    dispatch(setSelectedPerson(receiver));
    navigate('/transfer-nominal');
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[196px_1fr] min-h-screen font-[Plus_Jakarta_Sans,sans-serif] bg-[#F5F6FA]"
      style={{ gridTemplateRows: '64px 1fr' }}
    >
      <div className="col-span-1 md:col-span-2">
        <Topbar currentUser={currentUser} />
      </div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="p-7 flex flex-col gap-5 bg-[#F5F6FA]">

          {/* Page Header */}
          <div className="flex items-center gap-2.5">
            <img src="../assets/Send-2.png" alt="Transfer Icon" className="w-[22px] h-[22px] object-contain" />
            <h1 className="text-lg font-extrabold text-gray-900">Transfer Money</h1>
          </div>

          {/* Step Indicator */}
          <div className="flex flex-wrap items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2D39F5] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
              <span className="text-[11px] md:text-[13px] font-semibold text-gray-900">Find People</span>
            </div>
            <div className="w-10 md:w-20 mx-1 md:mx-2.5 border-t-2 border-dashed border-gray-300 flex-shrink-0" />
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
              <span className="text-[11px] md:text-[13px] font-semibold text-gray-400">Set Nominal</span>
            </div>
            <div className="w-10 md:w-20 mx-1 md:mx-2.5 border-t-2 border-dashed border-gray-300 flex-shrink-0" />
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">3</div>
              <span className="text-[11px] md:text-[13px] font-semibold text-gray-400">Finish</span>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 flex-1 flex flex-col">

            {/* Find People Header */}
            <div className="flex flex-col gap-4 mb-5">
              <div>
                <div className="text-base font-bold text-gray-900 mb-1">Find People</div>
                <div className="text-xs text-gray-400">
                  {pagination.total || 0} Results Found
                </div>
              </div>

              {/* Search Box */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-[9px] bg-white">
                <input
                  type="text"
                  placeholder="Enter Number Or Full Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-none outline-none text-[13px] text-gray-900 bg-transparent placeholder-gray-400"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                <img src="../assets/Search.png" alt="Search" className="w-4 h-4 object-contain opacity-50 flex-shrink-0" />
              </div>
            </div>

            {/* People Table */}
            <div className="overflow-x-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-40 text-gray-400">
                  Loading receivers...
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <tbody>
                    {receivers.map((receiver, index) => (
                      <tr
                        key={receiver.id}
                        onClick={() => handleSelectReceiver(receiver)}
                        className={`border-b border-gray-200 last:border-b-0 cursor-pointer transition-colors hover:bg-gray-100 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        }`}
                      >
                        {/* Avatar placeholder */}
                        <td className="w-[60px] py-3 pr-2 pl-4">
                          <div className="w-11 h-11 rounded-[10px] bg-[#2D39F5] text-white flex items-center justify-center font-bold text-sm">
                            {receiver.name.charAt(0).toUpperCase()}
                          </div>
                        </td>

                        {/* Name */}
                        <td className="py-3 px-2 md:px-4 text-sm font-semibold text-gray-900">
                          {receiver.name}
                        </td>

                        {/* Email/Phone - hidden on mobile, visible on md */}
                        <td className="hidden md:table-cell py-3 px-4 text-[13px] text-gray-500">
                          {receiver.phone_number}
                        </td>

                        {/* Star */}
                        <td className="w-16 py-3 pl-2 pr-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(receiver.id);
                            }}
                            className="bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-gray-100 flex items-center justify-center ml-auto"
                          >
                            <img
                              src="../assets/Star.png"
                              alt="Favourite"
                              className={`w-[18px] h-[18px] object-contain transition-opacity ${starred[receiver.id] ? "opacity-100" : "opacity-40"}`}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {receivers.length === 0 && !loading && (
                      <tr>
                        <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                          Tidak ada hasil ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {!loading && receivers.length > 0 && (
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setPage(pagination.prevPage)}
                  disabled={!pagination.prevPage}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {pagination.page} of {Math.ceil((pagination.total || 0) / 5)}
                </span>

                <button
                  onClick={() => setPage(pagination.nextPage)}
                  disabled={!pagination.nextPage}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </div>

        </main>

      <BottomNav />
    </div>
  );
}