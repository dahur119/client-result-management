import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleContext } from "../UserRoleContext";

const LecturerReset = (props) => {
  const { handleLogin } = useContext(UserRoleContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
  });
  // hello
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/student/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        handleStudentRegister();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const handleStudentRegister = () => {
    handleLogin("student");
    navigate("/");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-96">
      <div className="card">
        <div className="card-body">
          <div className="flex justify-center">
            <h2 className="text-center">Lecturer Reset</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2"
              >
                Reset
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md px-4 py-2"
                onClick={props.toggleForm}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LecturerReset;
