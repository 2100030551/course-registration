import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook, FaAward, FaChalkboardTeacher,
  FaUserTie, FaUsers, FaUserCog, FaGraduationCap,
  FaUniversity, FaBus, FaFileAlt, FaMoneyBillWave,
  FaSearch, FaCalendarAlt, FaChartLine, FaUserMd
} from "react-icons/fa";

const Home = ({ showLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [counts, setCounts] = useState({});

  // Memoize the arrays to prevent unnecessary re-renders
  const centerItems = useMemo(() => [
    { icon: <FaBook />, title: 'Exam' },
    { icon: <FaAward />, title: 'Employee' },
    { icon: <FaChalkboardTeacher />, title: 'Payroll' },
    { icon: <FaUserTie />, title: 'Research' },
    { icon: <FaUsers />, title: 'Leave' },
    { icon: <FaUserCog />, title: 'OBE' },
    { icon: <FaGraduationCap />, title: 'HR' },
    { icon: <FaUniversity />, title: 'Transport' },
    { icon: <FaBus />, title: 'Hostel' },
    { icon: <FaFileAlt />, title: 'Academic' },
  ], []);

  const leftItems = useMemo(() => [
    { icon: <FaSearch />, title: 'Journal & Conference' },
    { icon: <FaCalendarAlt />, title: 'Workshops, Seminar' },
    { icon: <FaChartLine />, title: 'Doctoral Faculty' },
    { icon: <FaUserMd />, title: 'Non-Teaching Staff' },
    { icon: <FaAward />, title: 'Guest Lectures' },
    { icon: <FaMoneyBillWave />, title: 'Teaching Staff' },
  ], []);

  const rightItems = useMemo(() => [
    { icon: <FaBook />, title: 'Awards & Recognition' },
    { icon: <FaChalkboardTeacher />, title: 'Project & Consultancy' },
    { icon: <FaUserTie />, title: 'Faculty' },
    { icon: <FaUsers />, title: 'Students' },
    { icon: <FaGraduationCap />, title: 'Fest' },
    { icon: <FaUniversity />, title: 'Cultural & Events' },
  ], []);

  useEffect(() => {
    const initialCounts = {};
    
    leftItems.forEach((item, index) => {
      initialCounts[`left-${index}`] = Math.floor(Math.random() * 1001) + 2000;
    });
    
    rightItems.forEach((item, index) => {
      initialCounts[`right-${index}`] = Math.floor(Math.random() * 1001) + 2000;
    });
    
    setCounts(initialCounts);
    
    const duration = 4000;
    const startTime = performance.now();
    
    const animateCounts = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const animatedCounts = {};
      Object.keys(initialCounts).forEach(key => {
        animatedCounts[key] = Math.floor(initialCounts[key] * progress);
      });
      
      setCounts(animatedCounts);
      
      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };
    
    requestAnimationFrame(animateCounts);
  }, [leftItems, rightItems]);

  const getIconColor = (index) => {
    return index % 2 === 0 ? 'maroon' : 'steelblue';
  };

  const circleLayoutStyles = {
    container: {
      position: 'relative',
      width: '600px',
      height: '600px',
      margin: '30px auto 0',
      borderRadius: '50%',
      backgroundColor: '#f5f5f5',
    },
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      zIndex: 2,
    },
    centerTitle: {
      margin: 0,
      color: '#a52a2a',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'scale(1.1)'
      }
    },
    item: {
      position: 'absolute',
      width: '120px',
      zIndex: 3,
    },
    itemContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px',
      backgroundColor: 'transparent',
    },
    icon: {
      fontSize: '35px',
      marginBottom: '5px',
    },
    title: {
      fontSize: '0.9rem',
      textAlign: 'center',
      marginBottom: '3px',
      color: '#333',
    },
    connectorLine: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      border: '1px dotted #999',
      height: '1px',
      transformOrigin: '0 0',
      zIndex: 1,
    },
  };

  const sideItemStyles = {
    left: {
      position: 'absolute',
      top: '50%',
      left: '5%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      zIndex: 1,
    },
    right: {
      position: 'absolute',
      top: '50%',
      right: '5%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      zIndex: 1,
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '15px',
      width: '150px',
    },
    icon: {
      fontSize: '15px',
      marginBottom: '5px',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '0.8rem',
      textAlign: 'center',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
    },
    count: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#555',
      marginTop: '3px',
    },
  };

  const navStyles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: '#a52a2a',
      color: 'white',
      height: '60px',
    },
    logo: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      marginRight: '4rem'
    },
    navLinks: {
      display: 'flex',
      gap: '0',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    loginLink: {
      marginLeft: 'auto',
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      position: 'relative',
      transition: 'all 0.3s ease',
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (showLogin) {
      showLogin();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <nav style={navStyles.nav}>
        <div style={navStyles.logo}>CRS HUB</div>
        <div style={navStyles.navLinks}>
          <Link to="/" style={navStyles.navLink}>Home</Link>
          <Link to="#" style={navStyles.navLink}>About Us</Link>
          <Link to="#" style={navStyles.navLink}>Contact Us</Link>
        </div>
        <Link 
          to="/login" 
          onClick={handleLoginClick}
          style={{ ...navStyles.navLink, ...navStyles.loginLink }}
        >
          Login
        </Link>
      </nav>

      {isHomePage && (
        <div style={circleLayoutStyles.container}>
          <div style={circleLayoutStyles.center}>
            <h1 
              style={circleLayoutStyles.centerTitle}
              onClick={handleLoginClick}
            >
              CRS
            </h1>
          </div>

          {centerItems.map((_, index) => {
            const angle = index * (360 / centerItems.length);
            const connectorRadius = 200;
            return (
              <div
                key={`connector-${index}`}
                style={{
                  ...circleLayoutStyles.connectorLine,
                  width: `${connectorRadius}px`,
                  transform: `rotate(${angle}deg)`,
                }}
              />
            );
          })}

          {centerItems.map((item, index) => {
            const angle = index * (360 / centerItems.length);
            const iconRadius = 250;
            const x = iconRadius * Math.cos(angle * Math.PI / 180);
            const y = iconRadius * Math.sin(angle * Math.PI / 180);
            const iconColor = getIconColor(index);

            return (
              <div
                key={`icon-${index}`}
                style={{
                  ...circleLayoutStyles.item,
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div style={circleLayoutStyles.itemContent}>
                  <div style={{ ...circleLayoutStyles.icon, color: iconColor }}>{item.icon}</div>
                  <div style={circleLayoutStyles.title}>{item.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={sideItemStyles.left}>
        {leftItems.map((item, index) => {
          const iconColor = getIconColor(index);
          return (
            <div key={index} style={sideItemStyles.item}>
              <div style={{ ...sideItemStyles.icon, color: iconColor }}>{item.icon}</div>
              <div style={sideItemStyles.titleContainer}>
                <div style={sideItemStyles.count}>{counts[`left-${index}`]}</div>
                <div style={sideItemStyles.title}>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={sideItemStyles.right}>
        {rightItems.map((item, index) => {
          const iconColor = getIconColor(index);
          return (
            <div key={index} style={sideItemStyles.item}>
              <div style={{ ...sideItemStyles.icon, color: iconColor }}>{item.icon}</div>
              <div style={sideItemStyles.titleContainer}>
                <div style={sideItemStyles.count}>{counts[`right-${index}`]}</div>
                <div style={sideItemStyles.title}>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;