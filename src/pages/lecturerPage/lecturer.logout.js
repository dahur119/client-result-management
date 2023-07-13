import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LecturerLogout = () => {
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

        toast.success("Logout successful!");
        navigate("/lecturer", { replace: true });
        window.location.reload();
        toast.success("Logout successful!"); // Show success toast notification
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred during student logout", error);
      toast.error("An error occurred during logout"); // Show error toast notification
    }
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>;
      <ToastContainer />
    </div>
  );
};

export default LecturerLogout;
