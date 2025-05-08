import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaSearch, FaBell } from "react-icons/fa";

const Index = ({ setIsLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Optional: remove persistence if used
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon); // Set hovered icon
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null); // Reset hovered icon
  };

  const styles = {
    header: {
      backgroundColor: '#a52a2a',
      padding: '0 15px',
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      height: '60px',
      boxSizing: 'border-box',
    },
    leftContainer: {
      display: 'flex',
      alignItems: 'center', // Vertically center the logo and dashboard link
      gap: '20px', // Add 20px gap between logo and dashboard
    },
    logo: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: 'white',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      padding: '0 10px',
    },
    logout: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',  // Ensures the Logout icon starts as white
      textDecoration: 'none',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      marginLeft: 'auto', // Push Logout to the far-right
      gap: '10px',
    },
    icon: {
      marginRight: '5px',
      transition: 'transform 0.3s ease', // Transition for smooth scaling
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '850px', // Adds some space between search bar and logo/dashboard
      backgroundColor: '#fff',
      borderRadius: '5px',
      padding: '2px 5px',
    },
    searchInput: {
      border: 'none',
      padding: '2px 5px',
      fontSize: '1rem',
      borderRadius: '9px',
      width: '200px',
      outline: 'none',
    },
    searchIcon: {
      marginRight: '8px',
      color: '#a52a2a',
    },
    notificationContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '20px', // Space between the search bar and notification icon
      cursor: 'pointer',
    },
    notificationIcon: {
      color: '#fff',
      fontSize: '1.2rem', // Make the notification icon bigger
      transition: 'color 0.3s ease, transform 0.3s ease', // Transition for smooth color and scale change
    },
    notificationHover: {
      color: 'white',
    },
    darkSteelBlue: '#1f3a5f', // Dark steel blue color
  };

  return (
    <header style={styles.header}>
      {/* Left-aligned CRS logo and Dashboard */}
      <div style={styles.leftContainer}>
        <div style={styles.logo}>CRS HUB</div>
        <Link
          to="/dashboard"
          style={styles.navItem}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
        >
          <FaHome
            style={{
              ...styles.icon,
              transform: hoveredIcon === 'home' ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          Home
        </Link>
      </div>

      {/* Search Bar on the Left of Logout */}
      <div style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>

      {/* Notification Icon */}
      <div style={styles.notificationContainer}>
        <FaBell
          style={{
            ...styles.notificationIcon,
            transform: hoveredIcon === 'notification' ? 'scale(1.1)' : 'scale(1)',
          }}
          onMouseEnter={() => handleMouseEnter('notification')}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Right-aligned Logout */}
      <Link
        to="/"
        onClick={handleLogout}
        style={styles.logout}
        onMouseEnter={() => handleMouseEnter('logout')}
        onMouseLeave={handleMouseLeave}
      >
        <FaSignOutAlt
          style={{
            ...styles.icon,
            transform: hoveredIcon === 'logout' ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        Logout
      </Link>
    </header>
  );
};

export default Index;
