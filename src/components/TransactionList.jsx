import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const transactions = [
  { id: 1, name: "Ghaluh 1", phone: "082116304337", amount: 50000, type: "positive", avatar: "../assets/prof2/Rectangle 648.png" },
  { id: 2, name: "Cameron Williamson", phone: "(308) 555-0121", amount: 50000, type: "negative", avatar: "../assets/prof2/Rectangle 648-1.png" },
  { id: 3, name: "Cody Fisher", phone: "(704) 555-0127", amount: 50000, type: "positive", avatar: "../assets/prof2/Rectangle 648-2.png" },
  { id: 4, name: "Kristin Watson", phone: "(603) 555-0123", amount: 50000, type: "negative", avatar: "../assets/prof2/Rectangle 648-3.png" },
  { id: 5, name: "Floyd Miles", phone: "(671) 555-0110", amount: 50000, type: "positive", avatar: "../assets/prof2/Rectangle 648-4.png" },
  { id: 6, name: "Wade Warren", phone: "(225) 555-0118", amount: 50000, type: "negative", avatar: "../assets/prof2/Rectangle 648-5.png" },
  { id: 7, name: "Savannah Nguyen", phone: "(217) 555-0113", amount: 50000, type: "positive", avatar: "../assets/prof2/Rectangle 648-6.png" },
];

const formatRp = (n) => `Rp ${n.toLocaleString("id-ID")}`;

const TransactionRow = ({ tx, onDelete, isEven }) => (
  <div
    className={`flex items-center gap-3 px-6 py-3.5 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      isEven ? "bg-gray-100" : "bg-white"
    }`}
  >
    <img
      src={tx.avatar}
      alt={tx.name}
      className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
    />
    <span className="flex-1 text-sm font-semibold text-gray-500 text-center">
      {tx.name}
    </span>
    <span className="flex-1 text-sm text-gray-500">{tx.phone}</span>
    <span
      className={`flex-1 text-sm font-bold ${
        tx.type === "positive" ? "text-green-600" : "text-red-600"
      }`}
    >
      {tx.type === "positive" ? "+" : "-"}
      {formatRp(tx.amount)}
    </span>
    <button
      onClick={() => onDelete(tx.id)}
      className="w-8 h-8 rounded-md bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors ml-auto flex-shrink-0"
      title="Hapus"
    >
      <img
        src="../assets/Trash.png"
        alt="Delete"
        className="w-4 h-4 object-contain"
      />
    </button>
  </div>
);

export default function TransactionList({ initialSearch = '' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(transactions);
  const [search, setSearch] = useState(searchParams.get('search') || initialSearch);

  const handleSearchChange = (value) => {
    setSearch(value);
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const filtered = data.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search)
  );

  const handleDelete = (id) => setData((d) => d.filter((t) => t.id !== id));

  return (
    <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
      {/* Search Row */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <span className="text-[15px] font-bold text-gray-900">
          Find Transaction
        </span>
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

      {/* Transaction Rows */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-gray-400 text-sm">
          Tidak ada transaksi ditemukan
        </div>
      ) : (
        filtered.map((tx, i) => (
          <TransactionRow
            key={tx.id}
            tx={tx}
            onDelete={handleDelete}
            isEven={i % 2 === 1}
          />
        ))
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <span className="text-xs text-gray-400">
          Show 5 History of 100 History
        </span>
        <div className="flex items-center gap-1">
          <button
            className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:text-[#2D39F5] px-2 transition-colors"
          >
            Prev
          </button>

          {Array.from({ length: 9 }, (_, i) => i + 1).map(
            (n) => (
              <button
                key={n}
                className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-900 px-2 transition-colors"
              >
                {n}
              </button>
            )
          )}

          <button
            className="min-w-[30px] h-[30px] rounded-md border-none bg-transparent text-[13px] font-medium text-gray-500 cursor-pointer hover:text-[#2D39F5] px-2 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}