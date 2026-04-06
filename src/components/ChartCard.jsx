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

const chartData = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Income',
      data: [12000, 2000, 95000, 28000, 42000, 20000, 12000],
      backgroundColor: '#2D39F5',
      borderRadius: 0,
      maxBarThickness: 90,
      barPercentage: 1,
      categoryPercentage: 1,
      borderSkipped: false,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
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

export default function ChartCard() {
  return (
    <div className="bg-white rounded-[14px] border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-[15px] font-bold">Income Chart</span>
        <div className="flex gap-2">
          {['7 Days', 'Income'].map((label) => (
            <button
              key={label}
              className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200 rounded-lg bg-gray-100 text-[12px] font-semibold text-gray-900 cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              {label}
              <img src={ASSETS.chevron} alt="▼" className="w-3 h-3 object-contain flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full h-[450px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

