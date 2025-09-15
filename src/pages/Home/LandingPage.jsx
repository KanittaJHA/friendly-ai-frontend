import React from "react";
import images from "../../assets/images/images";
import LeftColumn from "../../components/landing_page/LeftColumn";
import RightColumn from "../../components/landing_page/RightColumn";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${images.LANDING_HERO_BG})` }}
      />

      <div className="mx-auto min-h-screen max-w-screen-3xl relative z-10 landing-page">
        <div className="grid grid-cols-3 min-h-screen p-8 gap-[24px] max-[821px]:grid-cols-1">
          <LeftColumn />
          <img
            src={images.HOME_IMAGE}
            alt=""
            className="h-full rounded-3xl max-[821px]:h-[400px] max-[821px]:w-full object-cover"
          />
          <RightColumn />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
