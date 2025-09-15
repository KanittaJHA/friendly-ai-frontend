import React from "react";
import { RiSunLine, RiNotification2Line } from "react-icons/ri";

const icons = [
  { icon: <RiNotification2Line />, style: "border-gray-500 text-gray-500" },
  { icon: <RiSunLine />, style: "border-gray-500 text-gray-500" },
  {
    icon: <p className="text-xs text-white">PA</p>,
    style: "bg-primary border-primary text-white",
  },
];

const QandANavbar = () => {
  return (
    <div className="w-full h-[65px] bg-white/40 p-5">
      <div className="flex items-center gap-4 w-full justify-end">
        {icons.map((item, i) => (
          <div
            key={i}
            className={`p-1 rounded-full border-[1.5px] cursor-pointer flex items-center justify-center ${item.style}`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QandANavbar;
