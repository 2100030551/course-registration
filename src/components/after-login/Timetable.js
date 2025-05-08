import React, { useState } from "react";
import "../../styles/after-login.css";

const Timetable = ({ registeredCourses }) => {
  const [selectedSemester, setSelectedSemester] = useState("");  // Default as empty string
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "9:00 AM - 9:50 AM",
    "10:00 AM - 10:50 AM",
    "11:00 AM - 11:50 AM",
    "12:00 PM - 12:50 PM",
    "2:00 PM - 2:50 PM",
    "3:00 PM - 3:50 PM",
  ];

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const generateTimetable = () => {
    const timetable = {};
    days.forEach((day) => {
      timetable[day] = Array(timeSlots.length).fill(null);
    });

    if (!selectedSemester || !registeredCourses[selectedSemester]) return timetable;

    const semesterCourses = registeredCourses[selectedSemester];
    let courseIndex = 0;

    for (let i = 0; i < timeSlots.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (courseIndex < semesterCourses.length) {
          timetable[days[j]][i] = semesterCourses[courseIndex];
          courseIndex++;
        } else {
          courseIndex = 0;
          if (semesterCourses.length > 0) {
            timetable[days[j]][i] = semesterCourses[courseIndex];
            courseIndex++;
          }
        }
      }
    }

    return timetable;
  };

  const timetable = generateTimetable();

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Weekly Timetable</h1>

      {/* Semester Selection */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label htmlFor="semester" style={{ marginRight: "10px", fontWeight: "bold" }}>
          Select Semester:
        </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={handleSemesterChange}
          style={{ padding: "5px", fontSize: "16px" }}
        >
          <option value="">-- Select Semester --</option> {/* Default placeholder */}
          {Object.keys(registeredCourses).map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>

      {/* Display Timetable or Message */}
      {selectedSemester && registeredCourses[selectedSemester] ? (
        <table
          border="1"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr>
              <th>Weekdays</th>
              {timeSlots.map((slot, index) => (
                <th key={index}>{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, rowIndex) => (
              <tr key={rowIndex}>
                <td>{day}</td>
                {timeSlots.map((slot, colIndex) => (
                  <td key={colIndex}>
                    {timetable[day][colIndex] ? timetable[day][colIndex] : "Free Slot"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "red", marginTop: "20px" }}>
          {selectedSemester
            ? "You have not registered for this semester."
            : "Please select a semester to view the timetable."}
        </p>
      )}
    </div>
  );
};

export default Timetable;
