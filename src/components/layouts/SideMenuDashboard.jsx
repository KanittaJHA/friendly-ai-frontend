import React from "react";
import images from "../../assets/images/images";
import {
  RiInformationLine,
  RiLogoutCircleRLine,
  RiSettings5Line,
  RiDashboardLine,
  RiHistoryFill,
  RiPagesLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const SideMenuDashboard = ({ activeMenu, setActiveMenu }) => {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/signin");
  };
  const menuItems = [
    { icon: <RiDashboardLine />, label: "Dashboard" },
    { icon: <RiHistoryFill />, label: "Users History" },
    { icon: <RiPagesLine />, label: "Knowledge Base" },
  ];

  const bottomMenu = [
    { icon: <RiInformationLine />, label: "Help" },
    { icon: <RiSettings5Line />, label: "Settings" },
    { icon: <RiLogoutCircleRLine />, label: "Log Out" },
  ];

  return (
    <div className="w-full h-screen bg-white/40 flex flex-col justify-between p-5">
      <div>
        <Link to="/">
          <img src={images.LOGO_COLOR_B} className="w-[100px]" />
        </Link>

        <div className="flex flex-col justify-center items-center mt-10 gap-3">
          <div className="bg-primary w-[60px] h-[60px] rounded-full flex items-center justify-center">
            <p className="text-2xl text-white">PA</p>
          </div>

          <div className="items-center justify-center text-white text-xs rounded-[6px] px-3 py-[2.5px] cursor-pointer bg-gradient-to-r from-primary to-secondary">
            <p>Admin</p>
          </div>

          <p className="text-gray-700 text-xs">friendly.ai@example.com</p>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-gray-700">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 py-3 px-3 cursor-pointer rounded-[8px] ${
                activeMenu === item.label
                  ? "bg-primary text-white"
                  : "hover:bg-background"
              }`}
              onClick={() => setActiveMenu(item.label)}
            >
              {item.icon}
              <p className="text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 text-gray-700">
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
  );
};

export default SideMenuDashboard;
