import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images/images";
import TypewriterText from "../text/TypewriterText";
import { RiCloseLargeLine } from "react-icons/ri";

const LeftColumn = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Main", "Programs", "About us", "Blog", "Support"];

  const MenuButton = () => (
    <div
      className="flex flex-col gap-2 cursor-pointer max-[821px]:flex"
      onClick={() => setMenuOpen(true)}
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[45px] h-[2px] bg-black ${
            i === 3 ? "min-[1024px]:hidden" : ""
          }`}
        />
      ))}
    </div>
  );

  const MobileMenu = () => (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-background z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end m-8 cursor-pointer">
          <RiCloseLargeLine onClick={() => setMenuOpen(false)} />
        </div>
        <ul className="text-[14px] font-medium flex flex-col gap-5 mx-8">
          {navItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <Link to="/signin" className="btn-primary py-2 mx-8 w-[40%] mt-6">
          <span>Sign In</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex flex-col justify-between relative">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={images.LOGO_COLOR_B} alt="Logo" className="w-[100px]" />
        </Link>
        <MenuButton />
      </div>

      <MobileMenu />

      <div className="flex flex-col gap-8 max-[821px]:mt-10">
        <div className="flex items-center justify-between text-gray-900 text-sm max-[1025px]:text-[12px] max-[821px]:justify-start max-[821px]:gap-6">
          <p>TRANSFORMATIVE POTENTIAL</p>
          <span className="w-[85px] h-[1.5px] bg-gray-600" />
          <p>2025</p>
        </div>

        <div className="flex flex-col relative">
          <h1 className="text-[3rem] leading-15 font-medium max-[1025px]:text-[2.6rem] max-[1025px]:leading-13 min-[1524px]:text-[4rem] min-[1524px]:leading-19">
            AI engineering for intelligent solutions
          </h1>
          <img
            src={images.ICON_BLACK}
            alt="ICON"
            className="w-[45px] absolute bottom-[5.5px] left-56 max-[1025px]:left-49 max-[1025px]:bottom-[1px] min-[1524px]:left-75 min-[1524px]:bottom-[12px]"
          />
        </div>
      </div>

      <div className="w-full gap-2 flex flex-col text-sm max-[821px]:hidden">
        <div className="flex font-medium">
          <p className="font-medium">A</p>
          <TypewriterText text="ccelerating Progress" speed={200} loop={true} />
        </div>
        <div className="flex items-center gap-3">
          <img
            src={images.ACCELERATING_IMAGE}
            alt="Acceleratting"
            className="w-[120px] h-[65px] object-cover rounded-2xl"
          />
          <p className="text-[12px] w-[65%] text-gray-600">
            Enabling organizations to leverage cutting-edge artificial
            intelligence technologies
          </p>
        </div>
      </div>

      <Link
        to="/signin"
        className="btn-primary w-[40%] py-2 max-[1025px]:w-[50%] max-[821px]:mt-8"
      >
        <span>Get started</span>
      </Link>
    </div>
  );
};

export default LeftColumn;
