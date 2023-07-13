import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentLogout = () => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/lecturer/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      console.log(response);

      if (response.ok) {
        // Clear the access token and refresh token from local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear the refreshToken cookie

        navigate("/lecturer", { replace: true });
        window.location.reload();
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred during student logout", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>;
    </div>
  );
};

export default DepartmentLogout;
