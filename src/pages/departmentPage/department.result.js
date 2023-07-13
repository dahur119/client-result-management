import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetAllResults = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllStudentResults = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(
          "http://localhost:5000/api/departments/results",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          // Access token expired or invalid
          navigate("/department"); // Redirect to the login page
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to retrieve student results");
        }

        const resultsData = await response.json();
        setResults(resultsData);
      } catch (error) {
        console.error("Error retrieving student results:", error);
      }
    };

    getAllStudentResults();
  }, [navigate]);

  const handleResultClick = (resultId) => {
    toast.success("Result is been approved");
    navigate(`/approve-result/${resultId}`);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Results</h2>

        <table className="bg-white rounded shadow w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-4 px-6">Student</th>
              <th className="py-4 px-6">Course</th>
              <th className="py-4 px-6">Score</th>
              <th className="py-4 px-6">Approved</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={result._id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                } cursor-pointer hover:bg-gray-200 transition-colors`}
                onClick={() => handleResultClick(result._id)}
              >
                <td className="py-4 px-6">{result.student.name}</td>
                <td className="py-4 px-6">{result.course.courseName}</td>
                <td className="py-4 px-6">{result.score}</td>
                <td className="py-4 px-6">{result.approved ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GetAllResults;
