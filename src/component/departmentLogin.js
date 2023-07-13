import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleContext } from "../UserRoleContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepartmentLogin = (props) => {
  const { handleLogin } = useContext(UserRoleContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/departments/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        // Store the token in localStorage
        console.log(accessToken, refreshToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success("Login successful!");
        handleStudentLogin();
        // Show success toast notification
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred during login"); // Show error toast notification
    }
  };

  const handleStudentLogin = () => {
    // Perform student login logic
    handleLogin("department");
    navigate("/get-result");
  };

  return (
    <div className="flex justify-center  items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 w-60 mb-80">
        <div className="card">
          <div className="card-body">
            <div className="flex justify-center">
              <h2 className="text-center">Department Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DepartmentLogin;
