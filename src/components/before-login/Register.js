import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from 'react-icons/fa';

const Register = ({ onClose, showLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
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
    formRow: {
      display: "flex",
      gap: "10px"
    },
    halfWidth: {
      flex: "1",
      minWidth: "0"
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
    registerButton: {
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
    registerButtonHover: {
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
    },
    hintText: {
      fontSize: "12px",
      color: "#6c757d",
      marginTop: "-5px",
      marginBottom: "5px"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some(user => user.email === formData.email);
      
      if (userExists) {
        setError("Email already registered");
        setIsLoading(false);
        return;
      }

      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };

      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      setTimeout(() => {
        if (onClose) onClose();
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error("Registration failed. Please try again.");
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
        <h1 style={styles.heading}>Register</h1>

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
          <div style={styles.formRow}>
            <div style={styles.halfWidth}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={e => e.target.style = styles.input}
                />
              </div>
            </div>
            <div style={styles.halfWidth}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={e => e.target.style = styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={e => e.target.style = styles.input}
              autoComplete="username"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={e => e.target.style = styles.input}
              autoComplete="new-password"
            />
            <div style={styles.hintText}>Minimum 8 characters</div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={e => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={e => e.target.style = styles.input}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.registerButton,
              ...(isLoading ? styles.disabledButton : {}),
            }}
            disabled={isLoading}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = styles.registerButtonHover.backgroundColor)}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = styles.registerButton.backgroundColor)}
          >
            {isLoading ? (
              <span style={styles.loadingText}>Registering...</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Already have an account? <Link 
              to="/login" 
              onClick={handleLinkClick}
              style={styles.footerLink}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;