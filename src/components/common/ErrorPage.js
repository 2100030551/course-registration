import React from "react";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px", color: "#ff0000" }}>404</h1>
      <p style={{ fontSize: "24px" }}>Oops! The page you are looking for does not exist.</p>
      <a href="/" style={{ textDecoration: "none", color: "#007bff", fontSize: "18px" }}>
        Go back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
