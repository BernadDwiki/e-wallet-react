import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#374151',
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: '#111827',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      cornerRadius: 10,
      padding: 10,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(148, 163, 184, 0.2)',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
        callback: (value) => value.toLocaleString(),
      },
    },
  },
};

const ASSETS = {
  chevron: './assets/Vector(2).png',
};

export default function ChartCard({ data = [], loading = false, days, setDays, flow, setFlow }) {
  // Prepare labels and values based on selected `days`
  let processed = [];

  if ((days || 0) > 30) {
    // aggregate per month
    const monthly = {};
    data.forEach((item) => {
      const d = new Date(item.rawDate);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!monthly[key]) {
        monthly[key] = {
          label: d.toLocaleDateString('id-ID', { month: 'short' }),
          income: 0,
          expense: 0,
        };
      }
      monthly[key].income += item.income || 0;
      monthly[key].expense += item.expense || 0;
    });

    processed = Object.values(monthly);
  } else {
    // per day: weekday for <=7, day+month for <=30
    processed = data.map((item) => {
      const d = new Date(item.rawDate);
      const label = (days || 0) <= 7
        ? d.toLocaleDateString('id-ID', { weekday: 'short' })
        : d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });

      return {
        label,
        income: item.income || 0,
        expense: item.expense || 0,
      };
    });
  }

  const labels = processed.map((p) => p.label);
  const incomeValues = processed.map((p) => p.income || 0);
  const expenseValues = processed.map((p) => p.expense || 0);

  const datasets = [];
  if (flow === 'income' || flow === 'both') {
    datasets.push({
      label: 'Income',
      data: incomeValues,
      backgroundColor: '#2D39F5',
      borderRadius: 6,
      maxBarThickness: 60,
    });
  }

  if (flow === 'expense' || flow === 'both') {
    datasets.push({
      label: 'Expense',
      data: expenseValues,
      backgroundColor: '#f97316',
      borderRadius: 6,
      maxBarThickness: 60,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const chartTitle =
    flow === 'income'
      ? 'Income Chart'
      : flow === 'expense'
      ? 'Expense Chart'
      : 'Income & Expense Chart';

  return (
    <div className="card-white">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-[15px] font-bold">{chartTitle}</span>
        <div className="flex gap-2 items-center">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-100 text-[12px] font-semibold text-gray-900"
          >
            <option value={7}>7 Days</option>
            <option value={30}>30 Days</option>
            <option value={90}>90 Days</option>
          </select>

          <select
            value={flow}
            onChange={(e) => setFlow(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-100 text-[12px] font-semibold text-gray-900"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
      <div className="relative w-full h-112.5">
        {loading ? (
          <div className="flex h-full items-center justify-center text-gray-500">Loading chart...</div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}

