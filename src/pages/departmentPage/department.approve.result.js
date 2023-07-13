import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../alert";

const ApproveResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const approveResult = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(
          `http://localhost:5000/api/departments/${resultId}/approve`,
          {
            method: "PUT",
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
          throw new Error("Failed to approve result");
        }

        const data = await response.json();
        <Alert message="Wrong password!" isCorrect={true} />;
        console.log(data.message);
        // Redirect or perform other actions upon successful approval
        navigate("/get-result"); // Replace with your desired destination
      } catch (error) {
        console.error("Failed to approve result:", error);
        // Handle the error, e.g., display an error message
      } finally {
        setLoading(false);
      }
    };

    approveResult();
  }, [resultId, navigate]);

  if (loading) {
    // Render a loading indicator while waiting for the request to complete
    return <div>Loading...</div>;
  }

  return null; // or you can return a redirect component or other content
};

export default ApproveResult;
