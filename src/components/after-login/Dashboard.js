import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaFilter, FaCalendarAlt, FaBook, FaTasks } from "react-icons/fa";
import "../../styles/after-login.css";

// Custom Circular Progress Component
const CircularProgress = ({ percentage }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg className="progress-ring" width="80" height="80">
        {/* Background circle */}
        <circle
          className="progress-ring-circle-bg"
          stroke="#f0f0f0"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        {/* Progress circle */}
        <circle
          className="progress-ring-circle-progress"
          stroke="steelblue"
          strokeWidth="8"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <div className="progress-text">{percentage}%</div>
    </div>
  );
};

const Dashboard = ({ registeredCourses }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [completedAssignments, setCompletedAssignments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    course: "all",
    status: "all",
    dueDate: "all"
  });
  const [showFilters, setShowFilters] = useState(false);

  // Load completed assignments from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('completedAssignments');
    if (saved) {
      setCompletedAssignments(JSON.parse(saved));
    }
  }, []);

  // Save completed assignments to localStorage when they change
  useEffect(() => {
    localStorage.setItem('completedAssignments', JSON.stringify(completedAssignments));
  }, [completedAssignments]);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get all assignments with filters and search
  const getFilteredAssignments = () => {
    if (!registeredCourses) return [];

    // Flatten all courses and activities
    const coursesToProcess = Array.isArray(registeredCourses) 
      ? registeredCourses 
      : Object.values(registeredCourses).flat();

    let assignments = [];
    
    coursesToProcess.forEach(course => {
      if (course.activities) {
        course.activities.forEach(activity => {
          assignments.push({
            ...activity,
            id: activity.id || Math.random().toString(36).substr(2, 9),
            courseName: course.name || "Unnamed Course",
            courseId: course.id,
            completed: completedAssignments[activity.id] || false,
            status: activity.status || "not-started",
            dueDate: activity.dueDate || new Date().toISOString(),
            title: activity.title || "Untitled Assignment",
            progress: activity.progress || (completedAssignments[activity.id] ? 100 : 0)
          });
        });
      }
    });

    // Apply search filter
    if (searchTerm) {
      assignments = assignments.filter(assignment => 
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply course filter
    if (filters.course !== "all") {
      assignments = assignments.filter(
        assignment => assignment.courseId === filters.course
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      assignments = assignments.filter(
        assignment => {
          if (filters.status === "completed") return assignment.completed;
          if (filters.status === "not-started") return assignment.progress === 0;
          if (filters.status === "in-progress") return assignment.progress > 0 && assignment.progress < 100;
          return true;
        }
      );
    }

    // Apply due date filter
    if (filters.dueDate !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      assignments = assignments.filter(assignment => {
        const dueDate = new Date(assignment.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        
        switch (filters.dueDate) {
          case "today":
            return dueDate.getTime() === today.getTime();
          case "week":
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 7);
            return dueDate >= today && dueDate <= weekEnd;
          case "month":
            const monthEnd = new Date(today);
            monthEnd.setMonth(monthEnd.getMonth() + 1);
            return dueDate >= today && dueDate <= monthEnd;
          case "overdue":
            return dueDate < today && !assignment.completed;
          default:
            return true;
        }
      });
    }

    return assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  // Toggle assignment completion status
  const toggleAssignmentCompletion = (assignmentId) => {
    setCompletedAssignments(prev => ({
      ...prev,
      [assignmentId]: !prev[assignmentId]
    }));
  };

  // Update assignment progress
  const updateAssignmentProgress = (assignmentId, progress) => {
    // In a real app, you would update this in your state management
    console.log(`Updating assignment ${assignmentId} to ${progress}%`);
  };

  // Calculate completion percentage for a course
  const getCourseCompletion = (courseId) => {
    const assignments = getFilteredAssignments().filter(
      a => a.courseId === courseId
    );
    
    if (assignments.length === 0) return 0;
    
    const completedCount = assignments.filter(a => a.completed).length;
    return Math.round((completedCount / assignments.length) * 100);
  };

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return "No due date";
    }
  };

  const filteredAssignments = getFilteredAssignments();
  
  // Get unique courses for filters and progress overview
  const registeredCoursesList = [];
  if (registeredCourses) {
    const coursesToProcess = Array.isArray(registeredCourses)
      ? registeredCourses
      : Object.values(registeredCourses).flat();

    coursesToProcess.forEach(course => {
      if (!registeredCoursesList.some(c => c.id === course.id)) {
        registeredCoursesList.push({
          id: course.id,
          name: course.name || "Unnamed Course"
        });
      }
    });
  }

  return (
    <div className="dashboard">
      <h1>{getGreeting()}</h1>
      
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <button
          className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-item ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={`nav-item ${activeTab === "leaderboard" ? "active" : ""}`}
          onClick={() => setActiveTab("leaderboard")}
        >
          LeaderBoard
        </button>
        <button
          className={`nav-item ${activeTab === "achievements" ? "active" : ""}`}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
      </nav>

      {/* Dashboard Content */}
      {activeTab === "dashboard" && (
        <div className="dashboard-content">
          <section>
            <h2>Extra Courses</h2>
            <p>View and manage your enrolled courses.</p>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => (isActive ? "btn active" : "btn")}
            >
              Go to Course List
            </NavLink>
          </section>

          <section>
            <h2>Profile</h2>
            <p>Update your personal information.</p>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => (isActive ? "btn active" : "btn")}
            >
              Go to Profile
            </NavLink>
          </section>

          <section>
            <h2>Settings</h2>
            <p>Customize your account settings.</p>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => (isActive ? "btn active" : "btn")}
            >
              Go to Settings
            </NavLink>
          </section>
        </div>
      )}

      {/* Activity Content */}
      {activeTab === "activity" && (
        <div className="activity-content">
          {/* Search Bar */}
          <div className="search-container">
            <form 
              className="search-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search assignments or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FaSearch />
                </button>
              </div>
            </form>

            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              <form className="filter-form">
                <div className="filter-group">
                  <label htmlFor="course-filter">
                    <FaBook /> Course:
                  </label>
                  <select
                    id="course-filter"
                    value={filters.course}
                    onChange={(e) => setFilters({...filters, course: e.target.value})}
                  >
                    <option value="all">All Courses</option>
                    {registeredCoursesList.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="status-filter">
                    <FaTasks /> Status:
                  </label>
                  <select
                    id="status-filter"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="date-filter">
                    <FaCalendarAlt /> Due Date:
                  </label>
                  <select
                    id="date-filter"
                    value={filters.dueDate}
                    onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Due Today</option>
                    <option value="week">Due This Week</option>
                    <option value="month">Due This Month</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </form>
            </div>
          )}

          {/* Course Progress Overview */}
          <section className="progress-overview">
            <h2>Your Course Progress</h2>
            {registeredCoursesList.length > 0 ? (
              <div className="progress-circles">
                {registeredCoursesList.map(course => {
                  const completion = getCourseCompletion(course.id);
                  return (
                    <div key={course.id} className="course-progress">
                      <CircularProgress percentage={completion} />
                      <h3>{course.name}</h3>
                      <p>{completion}% Complete</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-courses">
                <p style={{color: 'red'}}>No registered courses found.</p>
              </div>
            )}
          </section>

          {/* Assignments List */}
          <section className="assignments-list">
            <div className="assignments-header">
              <h2>Upcoming Assignments</h2>
              <p className="results-count">
                Showing {filteredAssignments.length} assignment(s)
              </p>
            </div>

            {filteredAssignments.length > 0 ? (
              <div className="assignments-grid">
                {filteredAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className={`assignment-card status-${assignment.status}`}
                  >
                    <div className="assignment-header">
                      <h3>{assignment.courseName}</h3>
                      <div className="assignment-meta">
                        <span className="due-date">
                          <FaCalendarAlt /> Due: {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                    </div>
                    <p className="assignment-title">{assignment.title}</p>

                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${assignment.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{assignment.progress}%</span>
                    </div>

                    <div className="assignment-actions">
                      <div className="status-select">
                        <FaTasks />
                        <select
                          value={assignment.status}
                          onChange={(e) => updateAssignmentProgress(assignment.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <button 
                        className="btn-icon"
                        onClick={() => toggleAssignmentCompletion(assignment.id)}
                        aria-label={assignment.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        <i className={`fas fa-${assignment.completed ? 'check-circle' : 'circle'}`}></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : registeredCoursesList.length > 0 ? (
              <div className="no-assignments">
                <p>No assignments match your filters.</p>
                <button 
                  className="btn-clear"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      course: "all",
                      status: "all",
                      dueDate: "all"
                    });
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="no-assignments">
                <p style={{color: 'red'}}>Register courses to see assignments.</p>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Leaderboard Content */}
      {activeTab === "leaderboard" && (
        <div className="leaderboard-content">
          <h2>Leaderboard</h2>
          <p>This section is under construction or restricted access.</p>
          <p style={{ color: "red" }}>Admin users are not allowed to access this section.</p>
        </div>
      )}

      {/* Achievements Content */}
      {activeTab === "achievements" && (
        <div className="achievements-content">
          <h2>Achievements</h2>
          <p>This section is under construction or restricted access.</p>
          <p style={{ color: "red" }}>Admin users are not allowed to access this section.</p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;