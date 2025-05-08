import React from "react";
import ReactDOM from "react-dom/client"; // updated import for React 18
import App from "./App";

// Create a root using React 18's new API
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
