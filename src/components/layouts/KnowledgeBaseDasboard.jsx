import React from "react";
import KnowledgeBaseTable from "./KnowledgeBaseTable";
import DashboardNavbar from "../navbar/DashboardNavbar";
import { RiSearch2Line } from "react-icons/ri";

const KnowledgeBaseDasboard = () => {
  return (
    <div className="">
      <DashboardNavbar />

      <div className="p-5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Knowledge Base</h2>

          <div className="relative w-[35%]">
            <RiSearch2Line className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search Chats"
              className=" w-full pl-8 pr-2 py-2 text-xs border-[1.4px] border-gray-400 rounded-[8px] focus:outline-none"
            />
          </div>
        </div>

        <KnowledgeBaseTable />
      </div>
    </div>
  );
};

export default KnowledgeBaseDasboard;
