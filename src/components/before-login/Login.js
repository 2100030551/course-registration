import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes, FaRedo } from 'react-icons/fa';
import Footer from "../common/Footer";

const Login = ({ setIsLoggedIn, onClose, showRegister, showForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Inline CSS Styles
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
    loginButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "steelblue", // Changed from 'background' to 'backgroundColor'
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      margin: "12px 0 6px",
      transition: "background-color 0.2s"
    },
    loginButtonHover: {
      backgroundColor: "#4682b4" // Changed from 'background' to 'backgroundColor'
    },
    disabledButton: {
      backgroundColor: "#b3d7ff",
      cursor: "not-allowed"
    },
    captchaContainer: {
      display: "flex",
      flexDirection: "column",
      margin: "12px 0 8px"
    },
    captchaDisplay: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      gap: "8px"
    },
    captchaCode: {
      flexGrow: "1",
      padding: "6px 10px",
      background: "#f5f5f5",
      borderRadius: "4px",
      fontFamily: "monospace",
      fontSize: "16px",
      letterSpacing: "2px",
      textAlign: "center",
      userSelect: "none",
      color: "#333"
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
    },
    refreshIcon: {
      cursor: "pointer",
      fontSize: "18px",
      color: "black",
      marginLeft: "10px",
      transition: "color 0.2s"
    },
    refreshIconHover: {
      color: "#007bff"
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaCode = "";
    for (let i = 0; i < 5; i++) {
      captchaCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(captchaCode);
    setCaptchaInput("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password || !captchaInput) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (captchaInput !== captcha) {
      setError("Captcha is incorrect");
      generateCaptcha();
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        setIsLoggedIn(true);
        toast.success("Successfully logged in!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
        });
        
        setTimeout(() => {
          if (onClose) onClose();
          navigate("/dashboard");
        }, 2000);
      } else {
        setError("Invalid credentials");
        generateCaptcha();
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotClick = (e) => {
    e.preventDefault();
    if (showForgot) {
      showForgot();
    } else {
      navigate('/forgot-password');
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (showRegister) {
      showRegister();
    } else {
      navigate('/register');
    }
  };

  const getButtonStyle = () => {
    if (isLoading) {
      return { ...styles.loginButton, ...styles.disabledButton };
    }
    return {
      ...styles.loginButton,
      backgroundColor: isHovered ? styles.loginButtonHover.backgroundColor : styles.loginButton.backgroundColor
    };
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
        <h1 style={styles.heading}>Login</h1>

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

        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={e => e.target.style = styles.input}
              autoComplete="username"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={e => e.target.style = styles.input}
              autoComplete="current-password"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Captcha Verification:</label>
            <div style={styles.captchaContainer}>
              <div style={styles.captchaDisplay}>
                <div style={styles.captchaCode}>{captcha}</div>
                <FaRedo
                  style={styles.refreshIcon}
                  onMouseEnter={(e) => e.target.style.color = styles.refreshIconHover.color}
                  onMouseLeave={(e) => e.target.style.color = styles.refreshIcon.color}
                  onClick={generateCaptcha}
                />
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                placeholder="Enter Captcha"
                style={styles.input}
                onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
                onBlur={e => e.target.style = styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            style={getButtonStyle()}
            disabled={isLoading}
            onMouseEnter={() => !isLoading && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isLoading ? (
              <span style={styles.loadingText}>Logging in...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            <Link 
              to="/forgot-password" 
              onClick={handleForgotClick}
              style={styles.footerLink}
            >
              Forgot your password?
            </Link>
          </p>
          <p>
            Don't have an account? <Link 
              to="/register" 
              onClick={handleRegisterClick}
              style={styles.footerLink}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;