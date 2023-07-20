import React, { useContext } from "react";
// import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserRoleContext } from "../UserRoleContext";
import StudentLogout from "../pages/studentPage/Student.logout";
import LecturerLogout from "../pages/lecturerPage/lecturer.logout";
import DepartmentLogout from "../pages/departmentPage/department.logout";

const NavBar = () => {
  const { userRole } = useContext(UserRoleContext);

  const renderDashboardLink = () => {
    if (userRole === "lecturer") {
      return (
        <>
          <li>
            <Link
              to="/submit-result"
              className="text-white hover:text-gray-300 block"
            >
              Upload Result
            </Link>
          </li>
          <li>
            <Link
              to="/lecturer-result"
              className="text-white hover:text-gray-300 block"
            >
              View Result
            </Link>
          </li>
          <li>
            <Link to="/" className="text-white hover:text-gray-300 block">
              <LecturerLogout />
            </Link>
          </li>
        </>
      );
    } else if (userRole === "department") {
      return (
        <>
          <li>
            <Link
              to="/get-result"
              className="text-white hover:text-gray-300 block"
            >
              Student-Result
            </Link>
          </li>
          <li>
            <Link
              to="/lecturer-registration"
              className="text-white hover:text-gray-300 block"
            >
              Register Lecturer
            </Link>
          </li>
          <li>
            <Link
              to="/all-lecturer"
              className="text-white hover:text-gray-300 block"
            >
              Get Lecturer
            </Link>
          </li>
          <li>
            <Link to="/logout" className="text-white hover:text-gray-300 block">
              <DepartmentLogout />
            </Link>
          </li>
        </>
      );
    } else if (userRole === "student") {
      return (
        <>
          <li>
            <Link
              to="/view-result"
              className="text-white hover:text-gray-300 block"
            >
              View Result
            </Link>
          </li>
          <li>
            <Link
              to="/course-registration"
              className="text-white hover:text-gray-300 block"
            >
              Register Course
            </Link>
          </li>
          <li>
            <Link
              to="/view-all-course"
              className="text-white hover:text-gray-300 block"
            >
              View Course
            </Link>
          </li>
          <li>
            <Link to="/logout" className="text-white hover:text-gray-300 block">
              <StudentLogout />
            </Link>
          </li>
        </>
      );
    } else {
      return null; // Hide the dashboard link if no user role is specified
    }
  };

  const renderLoginOptions = () => {
    if (!userRole) {
      return (
        <>
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-300 block"
            ></Link>
          </li>
          <li>
            <Link
              to="/lecturer"
              className="text-white hover:text-gray-300 block"
            >
              Lecturer
            </Link>
          </li>
          <li>
            <Link
              to="/department"
              className="text-white hover:text-gray-300 block"
            >
              Department
            </Link>
          </li>
          <li>
            <Link
              to="/student"
              className="text-white hover:text-gray-300 block"
            >
              Student
            </Link>
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-white font-bold">
              Result Checker
            </Link>
          </div>
          {userRole && (
            <div className="flex items-center">
              <ul className="hidden md:flex space-x-8">
                {renderDashboardLink()}
              </ul>
            </div>
          )}
          {!userRole && (
            <div className="flex items-center">
              <ul className="hidden md:flex space-x-4">
                {renderLoginOptions()}
              </ul>
            </div>
          )}
          <div className="md:hidden">
            <FaBars className="text-white cursor-pointer" />
          </div>
        </div>
        {userRole && (
          <ul className="md:hidden mt-4">{renderDashboardLink()}</ul>
        )}
        {!userRole && (
          <ul className="md:hidden mt-4">{renderLoginOptions()}</ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
