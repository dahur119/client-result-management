// StudentFormToggle.js
import React, { useState } from "react";
import StudentRegister from "./studentRegister";
import StudentLogin from "./studentLogin";
const StudentFormToggle = () => {
  const [isLoginVisible, setLoginVisible] = useState(true);

  const toggleForm = () => {
    setLoginVisible(!isLoginVisible);
  };

  return (
    <div>
      {isLoginVisible ? (
        <StudentLogin toggleForm={toggleForm} />
      ) : (
        <StudentRegister toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default StudentFormToggle;
