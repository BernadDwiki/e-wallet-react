import React from 'react';

/**
 * Item transaksi yang dapat digunakan ulang dalam daftar transaksi.
 *
 * @param {object} props
 * @param {{ id: number, name: string, type: string, amount: string, positive: boolean, avatar: string }} props.transaction
 *   Objek transaksi yang berisi detail nama, jenis, jumlah, dan avatar.
 * @returns {JSX.Element} Komponen TransactionItem.
 */
const TransactionItem = ({ transaction }) => {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
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
  );
};

export default TransactionItem;