import { CloudLightning, DatabaseZap, Usb } from "lucide-react";

const HostedInfo = () => {
  const info = [
    {
      id: 1,
      icon: <CloudLightning />,
      title: "Cloud Lighting",
      desc: "Experience lightning-fast file sharing with our CloudLightning technology. Our platform leverages high-performance cloud computing infrastructure to deliver unparalleled speed.",
    },
    {
      id: 2,
      icon: <DatabaseZap />,
      title: "Database Zap",
      desc: "DatabaseZap empowers you to effortlessly synchronize and transfer data between your database systems and our secure cloud storage environment",
    },
    {
      id: 3,
      icon: <Usb />,
      title: "Usb Services",
      desc: "Our file-sharing platform offers seamless integration with USB devices, allowing you to easily transfer files between your computer and external storage devices.",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-5 mt-5 md:-mt-10 px-3 ">
      {info?.map((item) => (
        <div
          key={item?.id}
          style={{ backdropFilter: "blur(150px)" }}
          className="hostedCard p-5 rounded-md border-2 border-[#08072f] space-y-3 bg-[#08072f] hosted-card">
          <h2 className="relative z-20 mb-7 left-4 top-2 text-slate-200">{item?.icon}</h2>
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
