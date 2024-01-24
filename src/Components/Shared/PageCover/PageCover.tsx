import Image from "next/image";

const PageCover = ({ img, text }) => {
  return (
    <>
    <div className="hero h-[25vh] md:h-[60vh] lg:h-[70vh] relative">
    <Image
      src={img}
      alt="Description of your image"
      className="w-[100vw] h-[25vh] md:h-[60vh] lg:h-[70vh]"
      placeholder="blur"
    />
    <div className="hero-overlay absolute bg-[#0101019c] bg-opacity-40">
      <div className="hero-content w-full h-full flex justify-center alignItems-center text-center text-neutral-content">
        <div>
          <h2 className="text-3xl md:text-6xl font-bold">{text}</h2>
        </div>
      </div>
    </div>
  </div>
   
    </>
  );
};

export default PageCover;
