import React from "react";
import Sidebar from "../Sidebar/sidebar";
import "./header.css";

const header = () => {
  return (
    <div className="header">
      <div className="header_info">
        <div className="info">
          Face<span style={{ color: "#000" }}>Mania</span>
        </div>
      </div>
      <div className="header_right">
        <Sidebar className="sideBar" />
      </div>
    </div>
  );
};

export default header;
