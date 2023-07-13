import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentViewResult = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const response = await axios.get(
          "http://localhost:5000/api/student/result",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setResults(response.data.results); // Assuming the results array is nested under the 'results' property
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching result:", error);
        setIsLoading(false);
        setError(false);
      }
    };

    fetchResult();
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  if (isLoading) {
    <div>Loading result....</div>;
  }
  if (error) {
    <div>error occur ${error}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold mb-4">View Result</h2>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 md:px-8"
                  >
                    Course Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 md:px-8"
                  >
                    Credit
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 md:px-8"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 md:px-8"
                  >
                    Approved
                  </th>
                  {/* Other table headers */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap sm:px-6 md:px-8">
                      <div className="text-sm text-gray-900">
                        {result.course.courseName}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap sm:px-6 md:px-8">
                      <div className="text-sm text-gray-900">
                        {result.course.credit}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap sm:px-6 md:px-8">
                      <div className="text-sm text-gray-900">
                        {result.score}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap sm:px-6 md:px-8">
                      <div className="text-sm text-gray-900">
                        {result.approved ? "Yes" : "No"}
                      </div>
                    </td>
                    {/* Other table columns */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewResult;
