import React from "react";
import images from "../../assets/images/images";
import { RiArrowRightUpLine } from "react-icons/ri";

const SignInCards = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between gap-6 p-6 w-[100%] border-1 border-white/40 rounded-[24px] bg-white/20 backdrop-blur-md">
        <img
          src={images.GALLERY_2}
          className="w-60 h-30 object-cover rounded-3xl"
        />

        <div className="flex flex-col gap-3 w-full">
          <p className="text-black text-xs">
            Ask anything, from general knowledge to creative ideas, and get
            instant, accurate answers from your smart AI assistant.
          </p>

          <div className="flex items-center justify-end">
            <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center">
              <RiArrowRightUpLine className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInCards;
