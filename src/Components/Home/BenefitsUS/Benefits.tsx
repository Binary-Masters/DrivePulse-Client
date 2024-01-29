"use client";
import axios from "axios";
import { Tilt } from 'react-tilt'
import { useEffect, useState } from "react";
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
interface benifitesData {
  id: string;
  title: string;
  description: string;
  icon: string;
}
const Benefits = () => {
  const [benefits, setBenefits] = useState<benifitesData[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://drive-pulse-server.vercel.app/benifites"
      );
      setBenefits(res?.data);
      // console.log(res);
    };
    getData();
  }, []);
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
  return (
    <div
      className="py-16 bg-cover bg-blue-200-900/40 "
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100%",
      }}
    >
      <h2 className="py-10 text-4xl font-bold text-center">
        Who Benefits from <span className="text-[#5757f4]">DrivePulse</span>
      </h2>
      <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="rounded-md  shadow-md hover:shadow-lg shadow-[#5757f49f] hover:shadow-blue-400"
          >
            <Tilt
              options={{ scale: 1, max: 30, speed: 300, perspective: 2000 }}>
            <figure className="px-10 pt-10">
              <div className="flex justify-center text-5xl">
                {getIcon(item.icon)}
              </div>
            </figure>
            <div className="items-center text-center card-body">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p>{item.description}</p>
            </div>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
