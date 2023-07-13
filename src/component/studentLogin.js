import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleContext } from "../UserRoleContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentLogin = (props) => {
  const { handleLogin } = useContext(UserRoleContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        // Store the token in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success("Login successful!");
        handleStudentLogin();
      } else {
        const errorData = await response.json();

        // alert(errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleStudentLogin = () => {
    // Perform student login logic
    handleLogin("student");
    navigate("/view-result");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 w-60 mb-80">
        <div className="card">
          <div className="card-body">
            <div className="flex justify-center">
              <h2 className="text-center">Student Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                  onClick={props.toggleForm}
                >
                  Registration
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

export default StudentLogin;
