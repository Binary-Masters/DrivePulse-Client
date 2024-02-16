"use client"
import React, { useState } from 'react';
import { FaFolder, FaListUl } from 'react-icons/fa';
import { MdFolder } from 'react-icons/md';

const DropDownView = ({ onIsViewChange }) => {
  const [isView, setIsView] = useState("list");

  const handleIsViewChange = (newView) => {
    setIsView(newView);
    // Pass the updated view to the parent component
    onIsViewChange(newView);
  };

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn bg-primary text-white border-0 hover:bg-blue-700 md:text-[16px]"
      >
        <FaListUl className="text-xl  " />
        <span className="hidden md:block">View</span>
      </div>
      <div
        style={{
          backdropFilter: "blur(30px)",
          boxShadow: "1px 1px 20px #16aae0",
        }}
        tabIndex={0}
        className="dropdown-content  z-[1] menu p-5  rounded-box w-52  text-white"
      >
        <button
          onClick={() => handleIsViewChange("list")}
          className=" flex items-center gap-2 px-4 text-white font-medium hover:bg-primary p-2 rounded transition-all duration-200"
        >
          <FaListUl />
          List
        </button>
        <button
          onClick={() => handleIsViewChange("medium")}
          className=" flex items-center gap-2 px-4 text-white font-medium hover:bg-primary p-2 rounded transition-all duration-200"
        >
          <MdFolder />
          Medium icon
        </button>
        <button
          onClick={() => handleIsViewChange("large")}
          className=" flex items-center gap-2 px-4 text-white font-medium hover:bg-primary p-2 rounded transition-all duration-200"
        >
          <FaFolder />
          Large icon
        </button>
      </div>
    </div>
  );
};

export default DropDownView;
