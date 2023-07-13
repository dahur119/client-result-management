import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LecturerResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecturerResults = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const response = await axios.get(
          "http://localhost:5000/api/lecturer/view-result",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401) {
          // Access token expired or invalid
          navigate("/lecturer"); // Redirect to the login page
          return;
        }

        const data = response.data;
        setResults(data);
        console.log("better", data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLecturerResults();
  }, [navigate]); // Include 'navigate' in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <div className="flex justify-center items-center">
          <div className="max-w-lg p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">View Result</h2>
            <div className="overflow-x-auto">
              <table className="bg-white rounded shadow w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-4 px-6">Student Name</th>
                    <th className="py-4 px-6">Course Name</th>
                    <th className="py-4 px-6">Credit</th>
                    <th className="py-4 px-6">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr
                      key={result._id}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        {result.student}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {result.name}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {result.course}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {result.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LecturerResults;
