import React from "react";
import "../../styles/enroll.css";

const EnrolledCourses = ({ courses, onUnenroll }) => {
  return (
    <div className="enrolled-courses">
      <h1>Enrolled Courses</h1>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.name}</h3>
              <p>Instructor: {course.instructor}</p>
              <button onClick={() => onUnenroll(course)}>Unenroll</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrolledCourses;
