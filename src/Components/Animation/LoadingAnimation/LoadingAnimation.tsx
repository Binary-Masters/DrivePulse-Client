"use client";

import { BallTriangle } from "react-loader-spinner";
import "./style.css";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="main">
        <div className="jam a"></div>
        <div className="jam b"></div>
        <div className="jam c"></div>
        <div className="jam d"></div>
        <div className="jam e"></div>
        <div className="jam f"></div>
        <div className="jam g"></div>
        <div className="jam h"></div>
        <div className="jam i"></div>
        <div className="jam j"></div>
      </div>
      {/* <BallTriangle
        height={40}
        width={40}
        radius={5}
        color="#1640D6"
        ariaLabel="ball-triangle-loadingAnimation"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
    </div>
  );
};

export default LoadingAnimation;
