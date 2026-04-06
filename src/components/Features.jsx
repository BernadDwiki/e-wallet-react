const featureItems = [
  {
    icon: "./assets/u_money-bill.png",
    title: "Small Fee",
    desc: "We only charge 5% of every success transaction done in Zwallet app.",
  },
  {
    icon: "./assets/Shield Done.png",
    title: "Data Secured",
    desc: "All your data is secured properly in our system and it's encrypted.",
  },
  {
    icon: "./assets/u_user-check.png",
    title: "User Friendly",
    desc: "Zwallet come up with modern and sleek design and not complicated.",
  },
];

const Features = () => (
  <section
    className="flex flex-col md:flex-row items-center gap-0 md:gap-[250px] px-5 md:px-[200px] py-[50px] md:py-[170px] mt-[120px] md:mt-0"
    style={{
      backgroundImage: 'url("../assets/_8761_Vector__7813_Vector1.jpeg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="relative bottom-0 md:bottom-[50px]">
      <img
        src="./assets/mobile-dashboard.png"
        className="w-[200px] md:w-[300px] rounded-[20px]"
      />
    </div>
    <div className="text-white relative w-full md:w-auto md:top-[50px] -translate-y-[120px] md:translate-y-0">
      <h2 className="text-[35px] font-normal mb-[30px]">All The Great Zwallet Features.</h2>
      <p className="text-[15px] text-white/80 mb-8 leading-relaxed">
        We have some great features from the application and it's totally free to use by all users around the world.
      </p>
      <div className="flex flex-col gap-6 mb-8">
        {featureItems.map((item) => (
          <div key={item.title} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <img src={item.icon} alt="" className="w-[26px] h-[26px]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold mb-[10px]">{item.title}</h4>
              <p className="text-[15px] text-white/80 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-secondary w-full md:w-auto px-7 py-[14px] text-sm">
        Get Started
      </button>
    </div>
  </section>
);

export default Features;