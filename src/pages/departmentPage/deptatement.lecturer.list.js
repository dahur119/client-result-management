import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetAllLecturerLogin = () => {
  const [lecturer, setLecturer] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetLecturer = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const response = await axios.get(
          "http://localhost:5000/api/departments/all-lecturer",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setLecturer(response.data);
        console.log(response.data);
        setLoading(false);

        if (response.status === 401) {
          // Access token expired or invalid
          navigate("/department"); // Redirect to the login page
          return;
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGetLecturer(); // Call the fetchGetLecturer function
  }, [navigate]); // Add an empty dependency array to run the effect only once

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (lecturer.length === 0) {
    return <p>No lecturer found</p>;
  }

  // Render the lecturer data
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Lecturer Registration
        </h2>
        <div className="overflow-x-auto">
          <table className="bg-white rounded shadow w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">userName</th>
                <th className="py-4 px-6">Department</th>
              </tr>
            </thead>
            <tbody>
              {lecturer.map((lecturers, index) => (
                <tr
                  key={lecturers._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    {lecturers.name}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {lecturers.username}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {lecturers.department.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllLecturerLogin;
