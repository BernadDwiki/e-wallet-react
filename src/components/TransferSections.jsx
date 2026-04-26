import useLocalStorage from '../hooks/useLocalStorage.js';

const BASE = '../assets';

export function PersonInfo({ name = 'Ghaluh 1', phone = '(239) 555–0108', avatar }) {
  return (
    <div>
      <div className="text-base font-bold text-gray-900 mb-3.5">People Information</div>
      <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-5 py-4 relative">
        <img
          src={avatar || `${BASE}/prof3/Rectangle 648.png`}
          alt={name}
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[15px] font-bold text-gray-900">{name}</span>
          <span className="text-[13px] text-gray-500">{phone}</span>
          <img
            src={`${BASE}/Sidenav item.png`}
            alt="Verified"
            className="h-5 w-auto object-contain self-start mt-1"
          />
        </div>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-200 transition-colors border-none bg-transparent cursor-pointer">
          <img src={`${BASE}/Star.png`} alt="Favourite" className="w-5 h-5 object-contain" />
        </button>
      </div>
    </div>
  );
}

export function AmountSection({ value, onChange }) {
  return (
    <div>
      <div className="text-base font-bold text-gray-900 mb-3.5">Amount</div>
      <p className="text-[13px] text-gray-400 mb-3.5">
        Type the amount you want to transfer and then press continue to the next steps.
      </p>
      <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-[#2D39F5] transition-colors">
        <img
          src={`${BASE}/u_money-bill.png`}
          alt=""
          className="w-[18px] h-[18px] object-contain flex-shrink-0 opacity-50"
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter Nominal Transfer"
          className="border-none outline-none font-[inherit] text-sm text-gray-900 flex-1 bg-transparent placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export function NotesSection({ value, onChange }) {
  return (
    <div>
      <div className="text-base font-bold text-gray-900 mb-3.5">Notes</div>
      <p className="text-[13px] text-gray-400 mb-3.5">
        You can add some notes for this transfer such as payment coffee or something.
      </p>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Enter Some Notes"
        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 font-[inherit] text-sm text-gray-900 resize-y outline-none min-h-[130px] placeholder-gray-400 focus:border-[#2D39F5] transition-colors"
      />
    </div>
  );
}