import React from "react";
import QandA from "../../components/layouts/QandA";
import images from "../../assets/images/images";
import SideMenuQandA from "../../components/layouts/SideMenuQandA";

const QandALightMode = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src={images.QA_LIGHT}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="grid grid-cols-[0.7fr_3fr] relative z-10 h-full">
        <SideMenuQandA className="h-full" />
        <QandA className="h-full" />
      </div>
    </div>
  );
};

export default QandALightMode;
