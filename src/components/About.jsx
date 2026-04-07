import Card from './Card';

const aboutCards = [
  {
    icon: "./assets/Headphones.png",
    title: "24/7 Support",
    desc: "We have 24/7 contact support so you can contact us whenever you want and we will respond it.",
  },
  {
    icon: "./assets/Shield Done.png",
    title: "Data Privacy",
    desc: "We make sure your data is safe in our database and we will encrypt any data you submitted to us.",
  },
  {
    icon: "./assets/Download.png",
    title: "Easy Download",
    desc: "Zwallet is 100% totally free to use it's now available on Google Play Store and App Store.",
  },
];

const About = () => (
  <section className="flex flex-col md:flex-row items-center justify-between px-5 md:px-[150px] py-5 md:py-[100px]">
    <div className="flex flex-col gap-6 max-w-[400px] text-center md:text-left">
      <h2 className="font-normal text-[35px]">About The Application</h2>
      <p className="text-gray-500">
        We have some great features from the application and it's totally free to use by all users around the world.
      </p>
    </div>
    <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-10">
      {aboutCards.map((card) => (
        <Card
          key={card.title}
          bgColor="bg-[#4a6cf7]"
          borderRadius="rounded-[10px]"
          padding="pt-[45px] px-[30px] pb-[30px]"
          className="border-none text-white h-auto md:h-[300px] w-full md:w-[220px] text-center"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center mx-auto mb-5">
            <img src={card.icon} alt="" className="w-[26px] h-[26px]" />
          </div>
          <h3 className="pb-10">{card.title}</h3>
          <p className="text-sm text-white/80">{card.desc}</p>
        </Card>
      ))}
    </div>
  </section>
);

export default About;