const ASSETS = {
  balance: "./assets/balance.png",
  income: "./assets/u_money-bill.png",
  expense: "./assets/u_money-withdraw(1).png",
  badgeBalance: "./assets/Badge-Tag.png",
  badgeIncome: "./assets/Badge-Tag(1).png",
  badgeExpense: "./assets/Badge-Tag(2).png",
};

const STAT_CARDS = [
  { label: "Balance", value: "Rp.120.000", icon: ASSETS.balance, badge: ASSETS.badgeBalance },
  { label: "Income", value: "Rp.2.120.000", icon: ASSETS.income, badge: ASSETS.badgeIncome },
  { label: "Expense", value: "Rp.200.000", icon: ASSETS.expense, badge: ASSETS.badgeExpense },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-3 gap-3.5">
      {STAT_CARDS.map((card) => (
        <div key={card.label} className="card-white">
          <div className="flex items-center gap-2 mb-2.5">
            <img src={card.icon} alt={card.label} className="w-5 h-5 object-contain" />
            <span className="text-[13px] text-gray-500 font-medium">{card.label}</span>
          </div>
          <div className="text-[22px] font-extrabold text-gray-900 mb-2">{card.value}</div>
          <div className="inline-flex items-center">
            <img src={card.badge} alt="" className="h-[30px] w-auto object-contain block" />
          </div>
        </div>
      ))}
    </div>
  );
}
