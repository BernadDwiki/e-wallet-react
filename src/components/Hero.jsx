const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-[120px] py-0 md:py-20">
    <div className="w-full md:w-1/2 order-2 md:order-1 px-5 md:px-0 py-2 md:py-0">
      <h1 className="text-[40px] md:text-[50px] font-normal mb-[30px] leading-tight">
        Smart Way to Your Financial Business
      </h1>
      <p className="text-gray-500 mb-5">
        We bring you a mobile app for banking problems that oftenly wasting much of your times.
      </p>
      <button className="bg-[#2948ff] text-white px-4 py-[15px] border-none rounded-md cursor-pointer mb-6 hover:opacity-90 transition-opacity">
        Get Started
      </button>
      <p className="text-gray-500 mb-3">Available on</p>
      <div className="flex items-center gap-[30px]">
        <img src="./assets/gplay.png" alt="" className="w-[40px] max-w-full h-auto" />
        <img src="./assets/icon.png" alt="" className="w-[25px] max-w-full h-auto" />
      </div>
    </div>
    <div className="order-1 md:order-2">
      <img src="./assets/landingpg1.jpg" className="w-[450px] md:w-[600px] h-auto" />
    </div>
  </section>
);

export default Hero;