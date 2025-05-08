import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const MyCourses = ({ registeredCourses = {}, onDeleteCourse }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [coursesWithDates, setCoursesWithDates] = useState({});

  // Initialize courses with registration dates
  useEffect(() => {
    const initializeCourses = () => {
      const initializedCourses = {};
      
      Object.entries(registeredCourses).forEach(([semester, courses]) => {
        initializedCourses[semester] = courses.map(course => {
          // If course is already an object with registrationDate, keep it
          if (typeof course === 'object' && course.registrationDate) {
            return course;
          }
          
          // Otherwise create new object with current date
          return {
            id: typeof course === 'object' ? course.id : `${semester}-${Date.now()}`,
            name: typeof course === 'string' ? course : course?.name || 'Unnamed Course',
            registrationDate: new Date().toISOString() // Current date in ISO format
          };
        });
      });
      
      setCoursesWithDates(initializedCourses);
    };

    initializeCourses();
  }, [registeredCourses]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Flatten all courses with semester info
  const getAllCourses = () => {
    const allCourses = [];
    Object.entries(coursesWithDates).forEach(([semester, courses]) => {
      courses.forEach((course) => {
        allCourses.push({
          id: course.id,
          semester,
          name: course.name,
          registrationDate: course.registrationDate
        });
      });
    });
    return allCourses;
  };

  const handleDelete = async (courseId, semester) => {
    if (!onDeleteCourse || typeof onDeleteCourse !== 'function') {
      console.warn('Delete functionality not implemented');
      return;
    }

    setDeletingId(courseId);
    try {
      await onDeleteCourse(courseId, semester);
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const courses = getAllCourses();
  const hasCourses = courses.length > 0;

  // Styles (same as before)
  const styles = {
    myCoursesContainer: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
    coursesTableContainer: { overflowX: 'auto', marginTop: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' },
    coursesTable: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' },
    coursesTableHeader: { backgroundColor: '#f8f9fa', padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#495057', borderBottom: '2px solid #e9ecef' },
    coursesTableCell: { padding: '12px 16px', borderBottom: '1px solid #e9ecef', color: '#212529' },
    tableRowHover: { backgroundColor: '#f8f9fa' },
    deleteBtn: { background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', padding: '5px 8px', fontSize: '1rem', borderRadius: '4px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    deleteBtnDisabled: { color: '#adb5bd', cursor: 'not-allowed', background: 'transparent' },
    noCourses: { textAlign: 'center', color: '#6c757d', marginTop: '30px', fontSize: '1.1rem', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' },
  };

  return (
    <div style={styles.myCoursesContainer}>
      <h1>My Registered Courses</h1>
      
      {hasCourses ? (
        <div style={styles.coursesTableContainer}>
          <table style={styles.coursesTable}>
            <thead>
              <tr>
                <th style={styles.coursesTableHeader}>S.No</th>
                <th style={styles.coursesTableHeader}>Course Name</th>
                <th style={styles.coursesTableHeader}>Semester</th>
                <th style={styles.coursesTableHeader}>Registration Date</th>
                {onDeleteCourse && <th style={styles.coursesTableHeader}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={course.id}
                  style={index % 2 === 0 ? styles.tableRowHover : {}}
                >
                  <td style={styles.coursesTableCell}>{index + 1}</td>
                  <td style={styles.coursesTableCell}>{course.name}</td>
                  <td style={styles.coursesTableCell}>{course.semester}</td>
                  <td style={styles.coursesTableCell}>{formatDate(course.registrationDate)}</td>
                  {onDeleteCourse && (
                    <td style={styles.coursesTableCell}>
                      <button
                        style={{
                          ...styles.deleteBtn,
                          ...(deletingId === course.id ? styles.deleteBtnDisabled : {}),
                        }}
                        onClick={() => handleDelete(course.id, course.semester)}
                        disabled={deletingId === course.id}
                        aria-label={`Delete ${course.name}`}
                      >
                        {deletingId === course.id ? 'Deleting...' : <FaTrash size={16} />}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.noCourses}>No courses registered yet.</p>
      )}
    </div>
  );
};

export default MyCourses;
