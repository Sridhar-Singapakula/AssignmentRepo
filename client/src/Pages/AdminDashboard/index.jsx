import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar"
import  "./style.css"
import SidebarAdmin from "../../components/SidebarAdmin"
import AdminRoutes from "../../AdminRoutes"
import { useSelector } from "react-redux";


const ClientDashboard = () => {

  const { user } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 700;
      setIsMobile(mobile);
      
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const handleSidebarClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };


  return (
    <div className="dashboard_container">
      <Navbar />

      <div className="client_cont">
        {isMobile ? (
          <>
            <div className={`sidebar_container ${isSidebarOpen ? "open" : ""}`}>
              <SidebarAdmin onClick={handleSidebarClick} />
            </div>
            <div className={`client_area mobile ${isSidebarOpen ? "sidebar-open" : ""}`}>
              <AdminRoutes />
            </div>
            <div className="toggle_button" onClick={handleToggleSidebar}>
              <i className="bi bi-border-width"></i>
            </div>
          </>
        ) : (
          <>
            <div className="sidebar_container open">
              <SidebarAdmin onClick={handleSidebarClick} />
            </div>
            <div className="client_area">
              <AdminRoutes />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ClientDashboard