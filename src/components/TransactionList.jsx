import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/reportService";

const formatRp = (n) => `Rp ${n.toLocaleString("id-ID")}`;

const TransactionRow = ({ tx, isEven }) => (
  <tr
    className={`border-b border-gray-200 last:border-b-0 cursor-pointer transition-colors hover:bg-gray-100 ${
      isEven ? "bg-gray-100" : "bg-white"
    }`}
  >
    <td className="w-[60px] py-3 pr-2 pl-0">
      <img
        src={tx.avatar}
        alt={tx.name}
        className="w-11 h-11 rounded-lg object-cover block"
      />
    </td>

    <td className="py-3 px-2 md:px-4 text-sm font-semibold text-gray-900">
      {tx.name}
    </td>

    <td className="py-3 px-4 text-[13px] text-gray-500">
      {tx.phone}
    </td>

    <td className="py-3 px-4 text-sm font-bold text-right">
      <span className={tx.type === "positive" ? "text-green-600" : "text-red-600"}>
        {tx.type === "positive" ? "+" : "-"}
        {formatRp(tx.amount)}
      </span>
    </td>
  </tr>
);

export default function TransactionList({ initialSearch = "" }) {
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
    total_pages: 1,
    total: 0,
    nextPage: null,
    prevPage: null,
  });

  const loadTransactions = async () => {
    const result = await getTransactionHistory({
      page: currentPage,
      limit: 7,
      search,
    });

    if (!result.success) return;

    const payload = result.data?.data;
    const items = Array.isArray(payload?.items) ? payload.items : [];
    const page = payload?.page || 1;
    const limit = payload?.limit || 7;
    const total = payload?.total || 0;

    console.log("TransactionList payload:", payload);
    console.log("TransactionList items:", items);

    setTransactions(items);
    setPagination({
      page,
      limit,
      total,
      total_pages: Math.max(1, Math.ceil(total / limit)),
      nextPage: payload?.next_page ?? null,
      prevPage: payload?.prev_page ?? null,
    });
  };

  useEffect(() => {
    loadTransactions();
  }, [currentPage, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const transactionRows = (Array.isArray(transactions) ? transactions : []).map((item) => ({
    id: item.id,
    avatar: "../assets/prof2/Rectangle 648.png",
    name: item.name,
    phone: item.phone_number,
    amount: item.amount,
    transactionType: item.type,
    direction: item.direction,
    type: item.direction === "expense" ? "negative" : "positive",
    date: item.created_at,
    status: item.status,
  }));

  return (
    <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <span className="text-[15px] font-bold text-gray-900">Find Transaction</span>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3.5 py-2 bg-white w-[260px] focus-within:border-[#2D39F5] transition-colors">
          <input
            type="text"
            placeholder="Search name or phone number"
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 border-none outline-none text-[13px] text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <img
            src="../assets/Search.png"
            alt="Search"
            className="w-4 h-4 object-contain opacity-50 flex-shrink-0"
          />
        </div>
      </div>

      {transactionRows.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No transactions found</div>
      ) : (
        <div className="overflow-x-auto px-6">
          <table className="w-full border-collapse">
            <tbody>
              {transactionRows.map((tx, i) => (
                <TransactionRow key={tx.id} tx={tx} isEven={i % 2 === 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <span className="text-xs text-gray-400">
          Show {transactionRows.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} History
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:text-[#2D39F5] px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: pagination.total_pages || 1 }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`min-w-[30px] h-[30px] rounded-md border-none text-[13px] font-medium px-2 transition-colors ${
                page === currentPage
                  ? "bg-[#2D39F5] text-white cursor-default"
                  : "bg-transparent text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= pagination.total_pages}
            className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:text-[#2D39F5] px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}