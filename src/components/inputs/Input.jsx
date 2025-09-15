import React, { useState } from "react";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiUserFill,
  RiMailAiLine,
} from "react-icons/ri";

const Input = ({ value, onChange, lable, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full flex flex-col gap-3">
      <label className="text-[12px] text-black">{lable}</label>

      <div className="relative w-full">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-[#F2EEFA] text-[12px] py-3 px-5 rounded-[50px] pr-10
    border border-transparent focus:border-primary focus:ring-1.5 focus:ring-primary focus:outline-none"
        />

        {type === "password" ? (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <RiEyeLine size={20} className="text-primary" />
            ) : (
              <RiEyeOffLine size={20} className="text-gray-400" />
            )}
          </div>
        ) : type === "username" ? (
          <RiUserFill
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        ) : (
          <RiMailAiLine
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
