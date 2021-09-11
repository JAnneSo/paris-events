import React from "react";
import Lottie from "react-lottie";
import animationData from "../lottie/loader.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="loader">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default Loader;
