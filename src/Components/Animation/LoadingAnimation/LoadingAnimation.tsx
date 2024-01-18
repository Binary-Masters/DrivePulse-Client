"use client";

import { BallTriangle } from "react-loader-spinner";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <BallTriangle
        height={40}
        width={40}
        radius={5}
        color="#1640D6"
        ariaLabel="ball-triangle-loadingAnimation"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingAnimation;
