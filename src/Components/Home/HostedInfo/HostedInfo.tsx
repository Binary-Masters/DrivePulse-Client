import { CloudLightning, DatabaseZap, Usb } from "lucide-react";

const HostedInfo = () => {
  const info = [
    {
      id: 1,
      icon: <CloudLightning />,
      title: "Hosted PBX",
      desc: "The modern world is in a continuous movement and people everywhere are looking for quick, safe means of accessing",
    },
    {
      id: 2,
      icon: <DatabaseZap />,
      title: "SIP Trunking",
      desc: "The modern world is in a continuous movement and people everywhere are looking for quick, safe means of accessing",
    },
    {
      id: 3,
      icon: <Usb />,
      title: "Enchaced Call Center",
      desc: "The modern world is in a continuous movement and people everywhere are looking for quick, safe means of accessing",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-5 mt-5 md:-mt-10 px-3">
      {info?.map((item) => (
        <div 
          key={item?.id}
          style={{backdropFilter:"blur(150px)" }}
          className="hostedCard p-5 rounded-md border-2 border-[#08072f] space-y-3 bg-[#08072f]">
          <h2 className="relative z-20 mb-5 left-4 top-2 text-slate-200">{item?.icon}</h2>
          <div className="card_icon text-3xl  w-14 h-14 rounded-full absolute top-0 z-10 bg-slate-700"></div>
          <div className="card__title text-2xl font-semibold z-10 text-slate-300">
            {item?.title}
          </div>
          <div className="card_descripion text-slate-400 z-10">{item?.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default HostedInfo;
