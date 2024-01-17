import Image from "next/image";
import bannerbg from "../../../../public/file_share.jpg";
import { FaUpload } from "react-icons/fa";
import TypeWriter from "@/Utils/TypeWriter/TypeWriter";
const Banner: React.FC = () => {
  return (
    <div className="hero h-[100vh] relative">
      <Image
        src={bannerbg}
        alt="Description of your image"
        className="w-[100vw] h-[100vh]"
        placeholder="blur"
      />
      <div className="hero-overlay absolute bg-[#0101019c] bg-opacity-40">
        <div className="hero-content w-full h-full flex justify-center alignItems-center text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Hi There,</h1>
            <TypeWriter />
            <p className="mb-5">
              This Is File Sharing Platform ,You Can Store Your File And Share
              With Anyone With Valid Link...
            </p>
            <button className="btn btn-accent">
              <FaUpload /> Upload File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
