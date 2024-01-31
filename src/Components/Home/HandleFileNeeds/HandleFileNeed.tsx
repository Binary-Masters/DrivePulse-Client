import Image from "next/image";
import bgImage from "@/assests/bg.png";
const data = [
  {
    image: "https://i.ibb.co/JkHMfXR/share.png",
    title: "Share",
    description:
      "Share through email, link, or social network. Unlimited downloads. No wait times.",
  },
  {
    image: "https://i.ibb.co/kJFVR5g/collaborate.png",
    title: "Collaborate",
    description:
      "Store and share any file type. Share folders of project files. Easily email large files.",
  },
  {
    image: "https://i.ibb.co/CvscYPQ/cloud.png",
    title: "Store",
    description:
      "Securely store your files in a centralized location, making it easy to organize, manage, and access.",
  },
  {
    image: "https://i.ibb.co/4Rf6L8H/access.png",
    title: "Access",
    description:
      "Enjoy convenient and quick access to your files from anywhere. Never forget your work at home.",
  },
];

const HandleFileNeed = () => {
  return (
    <div className="py-10 relative">
      <h2 className="text-5xl text-center font-bold text-slate-300">
        Handles all of <span className="text-primary">your file</span> needs
      </h2>
      <p className="text-lg max-w-3xl px-3 mx-auto text-center mt-3 mb-10 text-slate-400">
        File storage made easy – including powerful features you won’t find
        anywhere else. Whether you’re sharing photos, videos, audio, or docs,
        MediaFire can simplify your workflow.
      </p>

      <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-7">
        {data.map((item, index) => (
          <div className="card2" key={index}>
            <div>
              <figure className="px-10 pt-10 flex items-center justify-center z-10">
                <Image
                  src={item?.image}
                  width={90}
                  height={90}
                  className="z-20"
                  alt="icons image"></Image>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="text-2xl font-bold z-10 text-slate-300">{item.title}</h3>
                <p className="text-slate-400 z-10">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleFileNeed;
