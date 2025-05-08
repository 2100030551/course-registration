import React, { useState } from "react";
import "../../styles/after-login.css";

const CourseList = ({ onEnroll }) => {
  const [courses] = useState([
    { id: 1, name: "Introduction to React", instructor: "John Doe", category: "Frontend" },
    { id: 2, name: "Advanced JavaScript", instructor: "Jane Smith", category: "Frontend" },
    { id: 3, name: "Web Development Basics", instructor: "Sarah Wilson", category: "Frontend" },
    { id: 4, name: "CSS and Design Systems", instructor: "Emily Davis", category: "Frontend" },
    { id: 5, name: "React and Redux", instructor: "Michael Johnson", category: "Frontend" },
    { id: 6, name: "Advanced Web Development", instructor: "Olivia Gray", category: "Frontend" },
    { id: 7, name: "Node.js Fundamentals", instructor: "Alice Johnson", category: "Backend" },
    { id: 8, name: "Python for Data Science", instructor: "Mark Brown", category: "Backend" },
    { id: 9, name: "Introduction to Backend Development", instructor: "Tom Hanks", category: "Backend" },
    { id: 10, name: "Building REST APIs with Express.js", instructor: "Natalie Portman", category: "Backend" },
    { id: 11, name: "Node.js and MongoDB", instructor: "Robert Downey", category: "Backend" },
    { id: 12, name: "Docker for Backend Developers", instructor: "Mark Ruffalo", category: "Backend" },
    { id: 13, name: "Full Stack Development", instructor: "Chris Green", category: "Core" },
    { id: 14, name: "Data Structures & Algorithms (DSA)", instructor: "Emma White", category: "Core" },
    { id: 15, name: "Java Programming", instructor: "David Blue", category: "Core" },
    { id: 16, name: "Python Programming", instructor: "Sophia Lee", category: "Core" },
    { id: 17, name: "C++ Programming", instructor: "Ethan Black", category: "Core" },
    { id: 18, name: "Machine Learning Fundamentals", instructor: "James Red", category: "Core" }
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (event, course) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (enrolledCourses.some(c => c.id === course.id)) {
      return;
    }

    setEnrolledCourses(prev => [...prev, course]);

    if (onEnroll) {
      onEnroll(course);
    }
  };

  return (
    <div className="course-list">
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => {
          const isEnrolled = enrolledCourses.some(c => c.id === course.id);

          return (
            <li 
              key={course.id}
              className={isEnrolled ? "enrolled" : ""}
            >
              <h3>{course.name}</h3>
              <p>Instructor: {course.instructor}</p>
              <p>Category: {course.category}</p>
              <button
                type="button"
                onClick={(event) => handleEnroll(event, course)}
                disabled={isEnrolled}
              >
                {isEnrolled ? "Enrolled" : "Enroll"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseList;