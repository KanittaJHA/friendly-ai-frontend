import React, { useState } from "react";
import images from "../../assets/images/images";
import SideMenuDashboard from "../../components/layouts/SideMenuDashboard";
import UsersHistoryDashboard from "../../components/layouts/UsersHistoryDashboard";
import KnowledgeBaseDasboard from "../../components/layouts/KnowledgeBaseDasboard";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // default tab

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <div className="p-5">Welcome to Dashboard</div>;
      case "Users History":
        return <UsersHistoryDashboard />;
      case "Knowledge Base":
        return <KnowledgeBaseDasboard />;
      default:
        return <div className="p-5">Select a menu</div>;
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={images.QA_LIGHT}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="grid grid-cols-[0.7fr_3fr] relative z-10 h-full">
        <SideMenuDashboard
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
