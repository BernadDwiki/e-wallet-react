import { useState } from "react";
import Card from "./Card";

const testimonialData = [
  {
    img: "./assets/customer1.png",
    name: "Sherina Claw",
    quote: "I use this app since 2 years ago and this is the best app that I've ever use in my entire life",
  },
  {
    img: "./assets/customer2.png",
    name: "James Bond",
    quote: "I use Zwallet to manage all financial needs. It's super easy to use and it's 100% free app",
  },
  {
    img: "./assets/customer3.png",
    name: "Ujang Kayu",
    quote: "Since I'm using this app, I'm not going to move to another similar app. Thank you Zwallet!",
  },
];
//ditambah kompoen yang kecil kaya card

const Testimonial = () => {
  const [offset, setOffset] = useState(0);
  const slide = (dir) =>
    setOffset((o) => (o + dir + testimonialData.length) % testimonialData.length);
  const visible = [0, 1, 2].map(
    (i) => testimonialData[(offset + i) % testimonialData.length]
  );

  return (
    <section className="px-10 py-20 text-center">
      <h2 className="text-[32px] mb-[10px]">Here From Our Customer</h2>
      <p className="text-gray-500 mb-[50px]">
        We always do our best for our customers to stay comfortable using the applications we provide
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          className="w-11 h-11 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center shrink-0 p-0 hover:opacity-80 hover:scale-105 transition-all"
          onClick={() => slide(-1)}
        >
          <img src="./assets/arrow-prev.png" alt="prev" className="w-11 h-11 object-contain" />
        </button>
        <div className="flex justify-center gap-[30px] overflow-hidden">
          {visible.map((t, i) => (
            <Card
              key={i}
              bgColor="bg-[#f7f7f7]"
              borderRadius="rounded-[10px]"
              padding="p-[30px]"
              className="flex flex-col justify-center items-center w-fit md:w-[260px] shrink-0 text-left"
            >
              <img src={t.img} className="w-[60px] h-[60px] rounded-full mb-[10px]" />
              <h4>{t.name}</h4>
              <div className="text-orange-400 my-[10px]">★★★★★ 5.0</div>
              <p className="text-sm text-[#555]">"{t.quote}"</p>
            </Card>
          ))}
        </div>
        <button
          className="w-11 h-11 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center shrink-0 p-0 hover:opacity-80 hover:scale-105 transition-all"
          onClick={() => slide(1)}
        >
          <img src="./assets/Group 1304.png" alt="next" className="w-11 h-11 object-contain" />
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <img src="./assets/Group 1300.png" alt="scroll indicator" className="h-[6px] object-contain" />
      </div>
    </section>
  );
};

export default Testimonial;