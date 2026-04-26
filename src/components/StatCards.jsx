import { useAuth } from '../hooks/useAuth.js';
import Card from './Card';

const ASSETS = {
  balance: "./assets/balance.png",
  income: "./assets/u_money-bill.png",
  expense: "./assets/u_money-withdraw(1).png",
  badgeBalance: "./assets/Badge-Tag.png",
  badgeIncome: "./assets/Badge-Tag(1).png",
  badgeExpense: "./assets/Badge-Tag(2).png",
};

export default function StatCards() {
  const { currentUser } = useAuth();

  const STAT_CARDS = [
    { label: "Balance", value: `Rp.${(currentUser?.balance || 0).toLocaleString('id-ID')}`, icon: ASSETS.balance, badge: ASSETS.badgeBalance },
    { label: "Income", value: `Rp.${(currentUser?.income || 0).toLocaleString('id-ID')}`, icon: ASSETS.income, badge: ASSETS.badgeIncome },
    { label: "Expense", value: `Rp.${(currentUser?.expense || 0).toLocaleString('id-ID')}`, icon: ASSETS.expense, badge: ASSETS.badgeExpense },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
      {STAT_CARDS.map((card) => (
        <Card key={card.label} className="text-left">
          <div className="flex items-center gap-2 mb-2.5">
            <img src={card.icon} alt={card.label} className="w-5 h-5 object-contain" />
            <span className="text-[13px] text-gray-500 font-medium">{card.label}</span>
          </div>
          <div className="text-[22px] md:text-[22px] font-extrabold text-gray-900 mb-2 break-words">{card.value}</div>
          <div className="inline-flex items-center">
            <img src={card.badge} alt="" className="h-[30px] w-auto object-contain" />
          </div>
        </Card>
      ))}
    </div>
  );
}
