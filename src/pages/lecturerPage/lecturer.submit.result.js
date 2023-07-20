import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LecturerResultForm(props) {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [score, setScore] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/lecturer/all-student"
      );
      console.log("fetching all student", response);

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        toast.error("Failed to fetch student data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching student data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/lecturer/all-courses"
      );

      if (response.ok) {
        const data = await response.json();
        console.log("checking", data);
        setCourses(data);
      } else {
        console.log("Failed to fetch course data");
      }
    } catch (error) {
      console.log("An error occurred while fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("checkingacess", accessToken);
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      // Make a POST request to your backend API
      const response = await fetch(
        "http://localhost:5000/api/lecturer/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ studentId, courseId, score }),
        }
      );

      console.log("checking response hello", response);

      if (response.status === 401) {
        // Access token expired or invalid
        navigate("/lecturer"); // Redirect to the login page
        return;
      }

      if (response.ok) {
        // Result submitted successfully
        // Show a success message or perform any other necessary actions

        toast.success("submit result  successful!");
        navigate("/lecturer-result");
      } else {
        // Handle error response
        const errorData = await response.json();
        toast.error("You don't register for the course");
        console.log("Error:", errorData.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.log("An error occurred while submitting the result:", error);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="studentId"
          >
            Select a student
          </label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="courseId"
          >
            Select a course
          </label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="score"
          >
            Score
          </label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            type="text"
            id="score"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={props.toggleForm}
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default LecturerResultForm;
//hello
