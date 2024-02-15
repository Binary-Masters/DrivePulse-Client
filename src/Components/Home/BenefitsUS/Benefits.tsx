"use client";
import { Tilt } from "react-tilt";
import {
  BsBook,
  BsBriefcaseFill,
  BsBrush,
  BsBuilding,
  BsCalendar,
  BsFilm,
  BsHeart,
  BsPerson,
} from "react-icons/bs";
import bg from "@/assests/mesh-309.png";
import useBenifites from "@/Hooks/useBenifites";
import LoadingAnimation from "@/Components/Animation/LoadingAnimation/LoadingAnimation";
// interface benifitesData {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
// }
const Benefits = () => {
  const [benefits, loading] = useBenifites();
  // const [benefits, setBenefits] = useState<benifitesData[]>([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get(
  //       "https://drive-pulse-server.vercel.app/benifites"
  //     );
  //     setBenefits(res?.data);
  //     // console.log(res);
  //   };
  //   getData();
  // }, []);
  // console.log(benefits);
  const getIcon = (icon) => {
    switch (icon) {
      case "BsBriefcaseFill":
        return <BsBriefcaseFill />;
      case "BsBook":
        return <BsBook />;
      case "BsHeart":
        return <BsHeart />;
      case "BsBrush":
        return <BsBrush />;
      case "BsFilm":
        return <BsFilm />;
      case "BsBuilding":
        return <BsBuilding />;
      case "BsCalendar":
        return <BsCalendar />;
      case "BsPerson":
        return <BsPerson />;
      default:
        return null;
    }
  };
  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div
      className="py-16 ">
      <h2 className="py-10 text-4xl font-bold text-center text-slate-300">
        Who Benefits from <span className="text-primary">DrivePulse?</span>
      </h2>
      <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="rounded-md  shadow-md hover:shadow-lg shadow-[#5757f49f] hover:shadow-primary cursor-pointer">
            <Tilt
              options={{ scale: 1, max: 30, speed: 300, perspective: 2000 }}>
              <figure className="px-10 pt-10">
                <div className="flex justify-center text-5xl text-slate-200">
                  {getIcon(item.icon)}
                </div>
              </figure>
              <div className="items-center text-center card-body">
                <h3 className="text-2xl font-bold text-slate-300">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
