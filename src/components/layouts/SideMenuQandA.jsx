import React from "react";
import images from "../../assets/images/images";
import {
  RiLayoutRightLine,
  RiAddLine,
  RiSearch2Line,
  RiImageAiLine,
  RiFolderOpenLine,
  RiInformationLine,
  RiLogoutCircleRLine,
  RiSettings5Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const SideMenuQandA = () => {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(); // เรียก API logout, ล้าง localStorage
    navigate("/signin"); // ไปหน้าล็อกอิน
  };

  const mainMenu = [
    { icon: <RiSearch2Line className="text-[18px]" />, label: "Search Chats" },
    { icon: <RiImageAiLine className="text-[18px]" />, label: "Library" },
    {
      icon: <RiFolderOpenLine className="text-[18px]" />,
      label: "New project",
    },
  ];

  const bottomMenu = [
    { icon: <RiInformationLine className="text-[18px]" />, label: "Help" },
    { icon: <RiSettings5Line className="text-[18px]" />, label: "Settings" },
    { icon: <RiLogoutCircleRLine className="text-[18px]" />, label: "Log Out" },
  ];

  const recentChats = [
    "New Brand Identity Ideas for...",
    "Healthy Smoothie Recipes fo...",
    "Beginner Guide to Investmen...",
  ];

  return (
    <div className="w-full h-full bg-white/40 overflow-y-auto">
      <div className="w-full h-screen p-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={images.LOGO_COLOR_B} className="w-[100px]" />
          </Link>
          <RiLayoutRightLine className="text-[20px] text-gray-700" />
        </div>

        <div className="flex flex-col mt-8 space-y-8">
          <button className="btn-secondary flex items-center gap-2">
            <RiAddLine className="text-[20px]" />
            <span>New Chat</span>
          </button>

          <div className="flex flex-col gap-3 text-gray-700">
            {mainMenu.map((item, i) => (
              <div key={i} className="flex items-center gap-2 cursor-pointer">
                {item.icon}
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          <span className="w-full h-[1px] bg-gray-300"></span>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-700">Recent Chats</p>
            <div className="text-xs flex flex-col gap-2 text-gray-700">
              {recentChats.map((chat, i) => (
                <p key={i} className="cursor-pointer">
                  {chat}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-[8px] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">Upgrade to</p>
              <p className="flex items-center justify-center font-medium text-white text-sm rounded-[8px] px-3 py-[2px] cursor-pointer bg-gradient-to-r from-primary to-secondary">
                PRO
              </p>
            </div>
            <p className="text-[10px] text-gray-600">
              Unlock priority access, faster replies, and creative tools like
              image generation.
            </p>
            <button className="bg-black text-white rounded-full py-1.5 text-xs cursor-pointer">
              Learn more
            </button>
          </div>

          <div className="flex flex-col gap-3 text-gray-700 pb-5">
            {bottomMenu.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 cursor-pointer"
                onClick={item.label === "Log Out" ? handleLogout : undefined}
              >
                {item.icon}
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuQandA;
