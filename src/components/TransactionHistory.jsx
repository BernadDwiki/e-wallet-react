import { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import { getTransactionHistory } from '../services/reportService';

const formatRp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);

      const result = await getTransactionHistory({ page: 1, limit: 5, search: '' });

      if (result.success) {
        const items = Array.isArray(result.data?.data?.items)
          ? result.data.data.items
          : [];

        setTransactions(
          items.map((item) => ({
            id: item.id,
            name: item.name || 'Unknown',
            type: item.direction === 'expense' ? 'Send' : 'Receive',
            amount: `${item.direction === 'expense' ? '-' : '+'}${formatRp(item.amount)}`,
            positive: item.direction !== 'expense',
            avatar: '../assets/prof2/Rectangle 648.png',
          }))
        );
      }

      setLoading(false);
    };

    loadTransactions();
  }, []);

  return (
    <div className="overflow-hidden shadow-sm rounded-[24px] border border-gray-200">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-base font-bold text-gray-900">Transaction History</h2>
        <a href="/history-transaction" className="text-sm text-primary font-semibold hover:underline">
          See All
        </a>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse">
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-8 text-center text-gray-500">
                  No transaction history yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}