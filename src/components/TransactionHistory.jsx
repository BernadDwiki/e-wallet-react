import { useSelector } from 'react-redux';
import TransactionItem from './TransactionItem';

const formatRp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

export default function TransactionHistory() {
  const transfers = useSelector((state) => state.history.transfers);
  const transactions = transfers.slice(0, 9).map((transfer) => ({
    id: transfer.id,
    name: transfer.recipient?.name || 'Unknown',
    type: 'Send',
    amount: `-${formatRp(transfer.amount)}`,
    positive: false,
    avatar: transfer.recipient?.avatar || './assets/prof/1.png',
  }));

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