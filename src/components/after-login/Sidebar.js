import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaBook, 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaCalendarAlt,
  FaUserCog, 
  FaFileAlt,
  FaInfoCircle,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const menuItems = [
    {
      title: "Academic",
      icon: <FaBook />,
      items: [
        { name: "Academic Registration", path: "/academic-registration" },
        
        { name: "Academic Calendar", path: "/calendar" }
      ]
    },
    {
      title: "Courses",
      icon: <FaGraduationCap />,
      items: [
        { name: "My Courses", path: "/my-courses" },
        { name: "Class Schedule", path: "#" },
        { name: "Enrolled Courses", path: "/enrolled-Courses" },
        { name: "Waitlisted Courses", path: "#" }
      ]
    },
    {
      title: "Grades",
      icon: <FaFileAlt />,
      items: [
        { name: "My Grades", path: "#" },
        { name: "Grade Report", path: "#" },
        { name: "CGPA Calculator", path: "#" },
        { name: "Transcript", path: "#" }
      ]
    },
    {
      title: "Finance",
      icon: <FaMoneyBillWave />,
      items: [
        { name: "Fee Payments", path: "#" },
        { name: "Payment History", path: "#" },
        { name: "Scholarships", path: "#" },
        { name: "Outstanding Dues", path: "/dues" }
      ]
    },
    {
      title: "Schedule",
      icon: <FaCalendarAlt />,
      items: [
        { name: "Class Timetable", path: "/timetable" },
        { name: "Exam Schedule", path: "#" },
        { name: "Room Allocation", path: "#" },
        { name: "Attendance", path: "#" }
      ]
    },
    {
      title: "Profile",
      icon: <FaUserCog />,
      items: [
        { name: "My Profile", path: "/profile" },
        { name: "Change Password", path: "/change-password" },
        { name: "Settings", path: "/settings" }
      ]
    },
    {
      title: "Exams",
      icon: <FaFileAlt />,
      items: [
        { name: "Hall Ticket", path: "#" },
        { name: "Exam Results", path: "#" },
        { name: "Previous Papers", path: "#" }
      ]
    },
    {
      title: "Resources",
      icon: <FaInfoCircle />,
      items: [
        { name: "Library", path: "#" },
        { name: "Campus News", path: "#" },
        { name: "Help Center", path: "#" }
      ]
    }
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        {menuItems.map((menu, index) => (
          <li key={index} className="sidebar-item">
            <div 
              className="sidebar-header" 
              onClick={() => toggleDropdown(menu.title)}
            >
              <span className="sidebar-icon">{menu.icon}</span>
              <span>{menu.title}</span>
              <span className="sidebar-arrow">
                {openDropdown === menu.title ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {openDropdown === menu.title && (
              <ul className="dropdown-menu">
                {menu.items.map((item, i) => (
                  <li key={i}>
                    <Link to={item.path} className="dropdown-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;