import Image from "next/image";

const PageCover = ({ img, text }) => {
  const gradient = "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6))";
  return (
    <>
    <div className="hero h-[25vh] md:h-[60vh] lg:h-[70vh] relative">
    <Image
      src={img}
      alt="Description of your image"
      className="w-[100vw] h-[25vh] md:h-[60vh] lg:h-[70vh] object-cover"
      placeholder="blur"
    />
    <div className="hero-overlay absolute bg-opacity-10">
      <div className=" w-full items-center flex text-center text-slate-200 h-[25vh] md:h-[60vh] lg:h-[70vh]">
        <div style={{background: gradient}} className="w-full py-2">
          <h2 className="text-3xl  md:text-6xl font-bold">{text}</h2>
        </div>
      </div>
    </div>
  </div>
   
    </>
  );
};

export default PageCover;
