import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

export default function TransactionList({ initialSearch = '' }) {
  const transfers = useSelector((state) => state.history.transfers);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || initialSearch);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const itemsPerPage = 7;

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set('search', value);
      newParams.set('page', '1');
    } else {
      newParams.delete('search');
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const transactions = transfers.map((transfer) => ({
    id: transfer.id,
    name: transfer.recipient?.name || 'Unknown',
    phone: transfer.recipient?.phone || '',
    amount: transfer.amount,
    type: 'negative',
    avatar: transfer.recipient?.avatar || '../assets/prof2/Rectangle 648.png',
  }));

  const filtered = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 9) {
      setCurrentPage(page);
      const newParams = new URLSearchParams(searchParams);
      if (page === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', page.toString());
      }
      setSearchParams(newParams);
    }
  };

  return (
    <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <span className="text-[15px] font-bold text-gray-900">Find Transaction</span>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3.5 py-2 bg-white w-[260px] focus-within:border-[#2D39F5] transition-colors">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Enter Number Or Full Name"
            className="flex-1 border-none outline-none text-[13px] text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <img
            src="../assets/Search.png"
            alt="Search"
            className="w-4 h-4 object-contain opacity-50 flex-shrink-0"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-gray-400 text-sm">Tidak ada transaksi ditemukan</div>
      ) : (
        <div className="overflow-x-auto px-6">
          <table className="w-full border-collapse">
            <tbody>
              {paginatedData.map((tx, i) => (
                <TransactionRow key={tx.id} tx={tx} isEven={i % 2 === 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <span className="text-xs text-gray-400">
          Show {filtered.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} History
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:text-[#2D39F5] px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => handlePageChange(n)}
              className={`min-w-[30px] h-[30px] rounded-md border-none text-[13px] font-medium px-2 transition-colors ${
                n === currentPage
                  ? "bg-[#2D39F5] text-white cursor-default"
                  : "bg-transparent text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 9}
            className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:text-[#2D39F5] px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}