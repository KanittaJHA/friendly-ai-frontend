import React from "react";
import images from "../../assets/images/images";
import HomeCard from "../cards/HomeCard";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const RightColumn = () => {
  const navItems = ["Main", "Programs", "About us", "Blog", "Support"];
  const experienceImages = [
    images.EXPERIENCE_01,
    images.EXPERIENCE_02,
    images.EXPERIENCE_03,
  ];

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-start justify-between max-[821px]:hidden">
        <ul className="text-[12px] font-medium flex flex-col gap-2 cursor-pointer max-[1025px]:gap-1.5">
          {navItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <Link
          to="/signin"
          className="btn-primary w-[30%] py-1.5 max-[1025px]:w-[40%]"
        >
          <span>Sign In</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-4">
          {experienceImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Experience"
              className="w-[50px] h-[50px] rounded-[12px] object-cover border-2 border-background"
            />
          ))}
        </div>
        <div className="text-[12px]">
          <p className="text-black font-medium">Experiences</p>
          <p className="text-gray-600">revolutionizing industries</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[80px] font-medium">AI</p>
        <span className="w-[100px] h-[4px] bg-black"></span>
        <p className="text-[12px] text-gray-600 w-[40%] max-[1025px]:text-[10px]">
          Engineering as the driving force behind intelligent automation
        </p>
      </div>

      <HomeCard className="-ml-50" />

      <div className="flex items-center justify-end">
        <div className="border-[1.5px] w-[60px] h-[60px] rounded-full flex items-center justify-center">
          <RiArrowRightUpLine className="text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
