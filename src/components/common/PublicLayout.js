import React from "react";
import Footer from "./Footer";  // Include Footer only for non-authenticated routes

const PublicLayout = ({ children }) => {
  return (
    <div>
      {/* The children prop is where the page content (like Home, Login, etc.) will be rendered */}
      <div>{children}</div>
      
      {/* Footer is displayed only on public pages */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
