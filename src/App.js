
import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/navbar";
import DepartmentLogin from "./component/departmentLogin";
import StudentFormToggle from "./component/studentToggle";
import LecturerToggle from "./component/lecturerToggle";
// import LecturerLogin from "./component/lecturerLogin";
import CourseRegistrationForm from "./pages/studentPage/studentRegisterCourse";
import StudentViewAllCourse from "./pages/studentPage/studentViewAllCourses";
import StudentViewResult from "./pages/studentPage/studentView";
import LecturerFormToggle from "./pages/lecturerPage/lecturer.toggle";
import LecturerResults from "./pages/lecturerPage/lecturer.view.result";
import GetAllResults from "./pages/departmentPage/department.result";
import { UserRoleContext } from "./UserRoleContext";
import RegisterLecturerForm from "./pages/departmentPage/lecturer.register";
import ApprovedResult from "./pages/departmentPage/department.approve.result";
import GetAllLecturerLogin from "./pages/departmentPage/deptatement.lecturer.list";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        {/* <div
          className={`flex-grow mt-10 ${
            isSidebarOpen ? "justify-center ml-80" : "justify-center ml-10"
          }`}
        > */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:flex md:flex-wrap justify-center">
          <Routes>
            <Route exact path="/student" element={<StudentFormToggle />} />
            <Route path="/lecturer" element={<LecturerToggle />} />
            <Route path="/department" element={<DepartmentLogin />} />

            <Route
              path="/course-registration"
              element={<CourseRegistrationForm />}
            />
            <Route path="/view-all-course" element={<StudentViewAllCourse />} />
            <Route path="/view-result" element={<StudentViewResult />} />
            <Route path="/submit-result" element={<LecturerFormToggle />} />
            <Route path="/lecturer-result" element={<LecturerResults />} />
            <Route
              path="/lecturer-registration"
              element={<RegisterLecturerForm />}
            />
            <Route path="/get-result" element={<GetAllResults />} />
            <Route
              path="/approve-result/:resultId"
              element={<ApprovedResult />}
            />
            <Route path="/all-lecturer" element={<GetAllLecturerLogin />} />
          </Routes>
        </div>
        {/* </div> */}
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
