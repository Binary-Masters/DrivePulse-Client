"use client";
import usePricings from "@/Hooks/usePricings";
import "./pricing.css";
import LoadingAnimation from "../Animation/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import { useEffect, useState } from "react";
interface PricingCardData {
  id: string;
  benifit1: string;
  benifit2: string;
  benifit3: string;
  benifit4: string;
  price: number;
  recommended: string;
  btnColor: string;
  badg: string;
}

interface pricingsData {
  benefits: void;
  loading: any;
  refetch: void;
}
const PricingCard = () => {
  // const [pricings, loading] = usePricings<pricingsData[]>();
  const [pricings, loading] = usePricings();
  const [cards, setCards] = useState<PricingCardData[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://drive-pulse-server.vercel.app/pricing"
      );
      setCards(res?.data);
    };
    getData();
  }, []);

  if (loading) {
    return <LoadingAnimation/>
  }
  return (
    <div className="max-w-7xl my-20 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {pricings?.map((card) => (
        <div
          style={{
            backdropFilter: "blur(30px)",
            boxShadow: "0 1px 25px rgba(0,0,0,0.2)",
          }}
          key={card?.id}
          className="flex flex-col  p-6 mx-auto  bg-gray-100 text-center text-gray-900 rounded-lg border w-full cards"
        >
          {card?.badg && (
            <div className="w-[120px] absolute left-0 top-10 bg-red-600 text-white h-10 -rotate-45">
              <h2 className="text-xl font-bold mt-1 uppercase">{card?.badg}</h2>
            </div>
          )}
          <div className="flex justify-center items-baseline my-8 relative">
            <span className="mr-2 text-5xl font-extrabold flex items-start gap-1 z-10 text-white">
              <span className="text-2xl font-medium">$</span>
              {card?.price}
            </span>
            <div className="absolute -top-8 w-[110px] h-[110px] rounded-full bg-blue-400 ring-2 ring-primary ring-offset-2"></div>

            {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
          </div>

          <div className={`divider  text-2xl font-bold my-8`}>
            {card?.recommended}
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{card?.benifit1}</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{card?.benifit2}</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{card?.benifit3}</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{card?.benifit4}</span>
            </li>
          </ul>
          <button
            className={`btn btn-outline btn-${card?.btnColor} rounded-full text-xl`}
          >
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
