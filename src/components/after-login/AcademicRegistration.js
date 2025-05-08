import React, { useState } from "react";
import "../../styles/after-login.css"; // Updated import path
import "react-toastify/dist/ReactToastify.css";


const AcademicRegistration = ({ onRegister }) => {
  const [semester, setSemester] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const coursesBySemester = {
    "Semester 1": [
      "MA101: Mathematics 1",
      "PH101: Physics 1",
      "CH101: Chemistry 1",
      "EC101: English Communication",
      "CS101: C Programming",
      "CS102: Python Basics",
      "ME101: Engineering Mechanics",
      "IT101: Introduction to IT",
      "EV101: Environmental Science",
      "WP101: Workshop Practice",
    ],
    "Semester 2": [
      "MA102: Mathematics 2",
      "PH102: Physics 2",
      "CH102: Chemistry 2",
      "EC102: Advanced English Communication",
      "CS201: Data Structures with C",
      "CS202: Python Advanced",
      "EE101: Digital Electronics",
      "EE102: Basic Electrical Engineering",
      "AI101: Introduction to AI",
      "TW101: Technical Writing",
    ],
    "Semester 3": [
      "MA201: Discrete Mathematics",
      "CS301: Data Structures and Algorithms",
      "CS302: Database Management Systems",
      "CS303: Operating Systems Basics",
      "CS304: Java Programming",
      "CS305: Computer Architecture",
      "CS306: Software Engineering Principles",
      "ST101: Statistics for Engineers",
      "WD101: Web Development Basics",
      "CG101: Computer Graphics",
    ],
    "Semester 4": [
      "CS401: Theory of Computation",
      "CS402: Design and Analysis of Algorithms",
      "CS403: Operating Systems Advanced",
      "CS404: Networking Fundamentals",
      "CS405: JavaScript Programming",
      "CS406: Compiler Design",
      "CS407: Introduction to Cloud Computing",
      "CS408: Big Data Fundamentals",
      "CS409: Human-Computer Interaction",
      "CS410: Mobile Application Development",
    ],
    "Semester 5": [
      "AI201: Artificial Intelligence",
      "ML201: Machine Learning Basics",
      "CS501: Computer Networks Advanced",
      "SPM101: Software Project Management",
      "CY101: Cybersecurity Principles",
      "CS502: Cloud Computing Advanced",
      "CS503: Parallel Computing",
      "DM201: Data Mining",
      "BC101: Blockchain Basics",
      "OS101: Open Source Development",
    ],
    "Semester 6": [
      "DL201: Deep Learning Fundamentals",
      "IOT201: Internet of Things",
      "NLP201: Natural Language Processing",
      "WD201: Web Application Development",
      "MC101: Mobile Computing",
      "IR201: Information Retrieval",
      "CS601: Advanced Software Engineering",
      "DV201: Data Visualization",
      "DSP101: Digital Signal Processing",
      "QC101: Quantum Computing Basics",
    ],
    "Semester 7": [
      "CP701: Capstone Project 1",
      "ENT101: Entrepreneurship",
      "BC201: Business Communication",
      "PE101: Professional Ethics",
      "AI301: AI for Business",
      "ML301: Advanced ML Applications",
      "EL701: Elective 1",
      "EL702: Elective 2",
      "RM101: Research Methodologies",
      "IN701: Internship",
    ],
    "Semester 8": [
      "CP801: Capstone Project 2",
      "SI101: Startup Incubation",
      "BD101: Business Development",
      "OE801: Open Elective 1",
      "OE802: Open Elective 2",
      "IN801: Internship (6 months)",
      "AI401: Advanced Topics in AI",
      "CS801: Cloud Security",
      "CF101: Cyber Forensics",
      "IC101: Industry Certification",
    ],
  };


  const handleRegister = () => {
    if (semester && selectedCourses.length > 0) {
      onRegister(semester, selectedCourses);
      alert("Courses Registered Successfully!");
    } else {
      alert("Please select a semester and courses to register.");
    }
  };

  const handleCourseSelection = (course) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (prevSelectedCourses.includes(course)) {
        return prevSelectedCourses.filter((c) => c !== course);
      } else {
        return [...prevSelectedCourses, course];
      }
    });
  };

  return (
    <div className="academic-registration">
      <h1>Academic Registration</h1>

      {/* Semester Selection */}
      <div className="semester-selection">
        <label>Select Semester:</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="semester-select"
        >
          <option value="">Select Semester</option>
          {Object.keys(coursesBySemester).map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {/* Available Courses Heading */}
      {semester && (
        <div className="courses-list">
          <h2>Available Courses for {semester}:</h2>
          
          {/* Course List Grid */}
          <div className="course-items">
            {coursesBySemester[semester].map((course) => (
              <div key={course} className="course-item">
                <label
                  onClick={() => handleCourseSelection(course)} // Use handleCourseSelection for toggling
                  style={{ cursor: "pointer" }}
                >
                  {course}
                </label>
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)} // Control checkbox state with React state
                  onChange={() => handleCourseSelection(course)} // Handle checkbox change
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Register Button */}
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default AcademicRegistration;
