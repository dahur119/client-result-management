import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterLecturerForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lecturers, setLecturers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/departments/all-departments"
      );
      const { data } = response;
      console.log("checking data", data);
      setLecturers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch lecturers:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token from local storage

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the access token to the request headers
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/departments/register",
        {
          name,
          username,
          password,
          departmentId: selectedDept,
        },
        config // Include the config object with the request
      );

      if (response.status === 401) {
        // Access token expired or invalid
        navigate("/department"); // Redirect to the login page
        return;
      }

      const { message } = response.data;
      setSelectedDept(message);
      navigate("/all-lecturer");
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      } else {
        console.error(error);
        setError("An error occurred while registering the lecturer");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lecturer Registration</h2>
      {isLoading ? (
        <p>Loading lecturers...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Lecturer Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Department:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Dept </option>
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
            disabled={!selectedDept}
          >
            Register
          </button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterLecturerForm;
