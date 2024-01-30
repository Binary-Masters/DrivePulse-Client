import Image from "next/image";
import img1 from "../../../assests/images/about1.jpg";
import img2 from "../../../assests/images/about2.jpg";
import Link from "next/link";
import secureImg from "../../../assests/icons/secure.png"
const HomeAbout = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto mt-10 md:mt-20 px-3">
      {/* img */}
      <div className="flex-1 relative">
        <Image
          src={img1}
          alt="img-1"
          placeholder="blur"
          className="w-[90%] md:w-[500px] h-[400px] md:h-[600px] object-cover rounded shadow-lg"
        />
        <Image
          src={img2}
          alt="img-1"
          placeholder="blur"
          className="w-[200px] md:w-[300px] h-[300px] md:h-[400px] object-cover rounded absolute right-0 md:right-10 -bottom-5 shadow-xl"
        />
        <div className="absolute bottom-10 w-[300px] md:w-[350px] left-5  md:left-10 border shadow-md rounded-md bg-white p-2">
            <div className="flex items-center gap-2">
                <Image src={secureImg} alt="img" className="w-14 h-14 z-10"/>
                <h2 className="text-xl md:text-2xl font-semibold z-10">Secure <span className="text-primary">File</span> Hosting!</h2>
            </div>
        </div>
      </div>
      {/* content */}
      <div className="flex-1 space-y-7">
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 bg-primary"></div>
          <span className="uppercase font-semibold text-slate-300">
            About Us
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-300">
          What is <span className="bg-gradient-to-r from-blue-400 via-blue-800 to-purple-600 bg-clip-text text-transparent">DrivePulse</span>?
        </h2>
        <p className="text-slate-400 font-medium">
          Working with coworkers, customers and partners has never been simpler.
          With CloudMe, not only can you securely share files, you can also
          create, edit and review documents with others in real time from
          anywhere, on any device. From simplifying the way you manage your
          content to empowering global teams, Box helps you work smarter than
          ever before.
        </p>
        <Link href={"/about"} className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-primary border-2 border-primary rounded-md hover:text-white group ">
          <span className="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="relative">More About Us</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeAbout;
