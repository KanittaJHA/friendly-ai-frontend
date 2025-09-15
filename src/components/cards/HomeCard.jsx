import React from "react";
import { RiAddFill } from "react-icons/ri";
import images from "../../assets/images/images";

const HomeCard = ({ className }) => {
  return (
    <div className="relative max-[1025px]:mb-8">
      <div
        className={`${className} max-[1025px]:ml-0 grid grid-cols-2 items-start p-6 w-[100%] border-1 border-white/40 rounded-[24px] bg-white/20 backdrop-blur-md`}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">AI Community</p>
          <p className="text-[12px]">
            Join the community and unleash your creative spirit
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <p className="text-[12px]">More 20k users</p>
          <div className="flex items-center gap-2 justify-end">
            <div className="bg-black w-[35px] py-[3px] flex justify-center items-center rounded-[50px]">
              <RiAddFill className="text-white text-[14px]" />
            </div>

            <div className="flex -space-x-2 items-center">
              <img
                src={images.woman_01}
                className="w-[30px] h-[30px] object-cover rounded-full border-2 border-background"
              />
              <img
                src={images.MAN_01}
                className="w-[30px] h-[30px] object-cover rounded-full border-2 border-background"
              />
              <img
                src={images.woman_02}
                className="w-[30px] h-[30px] object-cover rounded-full border-2 border-background"
              />
              <img
                src={images.MAN_02}
                className="w-[30px] h-[30px] object-cover rounded-full border-2 border-background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
