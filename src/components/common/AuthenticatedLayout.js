import React from 'react';
import Sidebar from './Sidebar';  // Sidebar visible only after login
import Index from './Index';      // Navbar visible for authenticated users

const AuthenticatedLayout = ({ children }) => {
  return (
    <div>
      <Index /> {/* This renders the Navbar */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Sidebar visible for authenticated users */}
        <div style={{ marginLeft: '250px', padding: '20px' }}>
          {children} {/* Render the content of the page */}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
