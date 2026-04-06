const TRANSACTIONS = [
  { id: 1, name: "Robert Fox", type: "Transfer", amount: "+Rp50.000", positive: true, avatar: "./assets/prof/1.png" },
  { id: 2, name: "Floyd Miles", type: "Send", amount: "-Rp50.000", positive: false, avatar: "./assets/prof/1-1.png" },
  { id: 3, name: "Ujang", type: "Send", amount: "-Rp50.000", positive: false, avatar: "./assets/prof/1-2.png" },
  { id: 4, name: "Raulemons", type: "Transfer", amount: "+Rp50.000", positive: true, avatar: "./assets/prof/1-3.png" },
  { id: 5, name: "Reiva", type: "Transfer", amount: "+Rp50.000", positive: true, avatar: "./assets/prof/1-4.png" },
  { id: 6, name: "Thobie", type: "Send", amount: "-Rp50.000", positive: false, avatar: "./assets/prof/1-5.png" },
  { id: 7, name: "Buzjany", type: "Transfer", amount: "+Rp50.000", positive: true, avatar: "./assets/prof/1-6.png" },
  { id: 8, name: "Adisurya", type: "Send", amount: "-Rp50.000", positive: false, avatar: "./assets/prof/1-7.png" },
  { id: 9, name: "Miguelle", type: "Transfer", amount: "+Rp50.000", positive: true, avatar: "./assets/prof/1-8.png" },
];

export default function TransactionHistory() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h2 className="text-base font-bold text-gray-900">Transaction History</h2>
        <a href="/history-transaction" className="text-sm text-[#3b4afa] font-semibold hover:underline">
          See All
        </a>
      </div>

      <div className="divide-y divide-gray-200">
        {TRANSACTIONS.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <img
                src={transaction.avatar}
                alt={transaction.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-gray-900">{transaction.name}</div>
                <div className="text-xs text-gray-500">{transaction.type}</div>
              </div>
            </div>
            <div className={`text-sm font-semibold ${transaction.positive ? "text-green-600" : "text-red-600"}`}>
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
