import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseRegistrationForm = () => {
  const [lecturers, setLecturers] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [credit, setCredit] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/student/all-lecturer"
      );
      const { data } = response;
      setLecturers(data);
    } catch (error) {
      console.error("Failed to fetch lecturer names:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        courseName,
        credit,
        lecturerId: selectedLecturer,
      };

      const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the access token to the request headers
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/student/register-course",
        body,
        config
      );
      console.log("Course registration successful:", response.data);
      navigate("/view-all-course");
    } catch (error) {
      console.error("Failed to register for the course:", error);
    }
  };

  const isAuthenticated = !!localStorage.getItem("accessToken");
  if (!isAuthenticated) {
    navigate("/"); // Replace "/login" with your login route
    return null;
  }

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Course Registration</h2>
      {lecturers.length === 0 ? (
        <p>Loading lecturers...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Credit:</label>
            <input
              type="number"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lecturer:</label>
            <select
              value={selectedLecturer}
              onChange={(e) => setSelectedLecturer(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Lecturer</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer._id} value={lecturer._id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
            disabled={!selectedLecturer}
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default CourseRegistrationForm;
