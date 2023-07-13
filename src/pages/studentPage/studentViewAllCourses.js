import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentViewAllCourse = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const response = await axios.get(
          "http://localhost:5000/api/student/all-courses",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setRegisteredCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRegisteredCourses();
  }, []);

  if (loading) {
    return <p>Loading registered courses...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (registeredCourses.length === 0) {
    return <p>No registered courses found.</p>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Registered Courses
        </h2>
        <table className="bg-white rounded shadow w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-4 px-6">Course Name</th>
              <th className="py-4 px-6">Credit</th>
              <th className="py-4 px-6">Lecturer</th>
            </tr>
          </thead>
          <tbody>
            {registeredCourses.map((course, index) => (
              <tr
                key={course._id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-4 px-6">{course.courseName}</td>
                <td className="py-4 px-6">{course.credit}</td>
                <td className="py-4 px-6">{course.lecturer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentViewAllCourse;
