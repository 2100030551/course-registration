import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from 'react-icons/fa';
import Footer from "../common/Footer";

const ForgotPassword = ({ onClose, showLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Inline CSS Styles (matching login style)
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    form: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "350px",
      position: "relative"
    },
    heading: {
      textAlign: "center",
      color: "#2c3e50",
      fontSize: "22px",
      marginBottom: "15px"
    },
    formGroup: {
      marginBottom: "12px"
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "500",
      color: "#333",
      fontSize: "14px"
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      fontSize: "14px",
      margin: "3px 0 8px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      transition: "border-color 0.2s"
    },
    inputFocus: {
      borderColor: "#007bff",
      outline: "none",
      boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.1)"
    },
    resetButton: {
      width: "100%",
      padding: "10px",
      background: "#4682b4",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      margin: "12px 0 6px",
      transition: "background-color 0.2s"
    },
    resetButtonHover: {
      background: "#0069d9"
    },
    disabledButton: {
      backgroundColor: "#b3d7ff",
      cursor: "not-allowed"
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "13px",
      color: "#666"
    },
    footerLink: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.2s"
    },
    errorMessage: {
      color: "#dc3545",
      textAlign: "center",
      marginBottom: "15px",
      padding: "10px",
      background: "#f8d7da",
      borderRadius: "4px",
      borderLeft: "3px solid #dc3545",
      fontSize: "13px",
      position: "relative"
    },
    loadingText: {
      display: "inline-block",
      minWidth: "90px",
      fontSize: "13px"
    },
    closeIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
      fontSize: "18px",
      color: "#555555",
      transition: "color 0.2s"
    },
    closeIconHover: {
      color: "black"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate checking if email exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some(user => user.email === email);
      
      if (!userExists) {
        setError("No account found with this email");
        setIsLoading(false);
        return;
      }

      toast.success("Password reset link sent!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      setTimeout(() => {
        if (onClose) onClose();
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error("Failed to send reset link. Please try again.");
      setIsLoading(false);
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (onClose) {
      onClose();
      setTimeout(() => showLogin(), 100);
    } else {
      navigate('/login');
    }
  };

  return (
    <div 
      style={styles.container}
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <div 
        style={styles.form}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <FaTimes
            style={styles.closeIcon}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.color = styles.closeIconHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.closeIcon.color}
          />
        )}
        <h1 style={styles.heading}>Forgot Password</h1>

        {error && (
          <div style={styles.errorMessage}>
            {error}
            <FaTimes
              style={styles.closeIcon}
              onMouseEnter={(e) => e.target.style.color = styles.closeIconHover.color}
              onMouseLeave={(e) => e.target.style.color = styles.closeIcon.color}
              onClick={() => setError("")}
            />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={e => e.target.style = styles.input}
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.resetButton,
              ...(isLoading ? styles.disabledButton : {}),
            }}
            disabled={isLoading}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = styles.resetButtonHover.backgroundColor)}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = styles.resetButton.backgroundColor)}
          >
            {isLoading ? (
              <span style={styles.loadingText}>Sending...</span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Remember your password? <Link 
              to="/login" 
              onClick={handleLinkClick}
              style={styles.footerLink}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;