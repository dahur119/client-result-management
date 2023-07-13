// StudentFormToggle.js
import React, { useState } from "react";
import LecturerLogin from "./lecturerLogin";
import LecturerReset from "./lecturerReset";

const LecturerToggle = () => {
  const [isLoginVisible, setLoginVisible] = useState(true);

  const toggleForm = () => {
    setLoginVisible(!isLoginVisible);
  };

  return (
    <div>
      {isLoginVisible ? (
        <LecturerLogin toggleForm={toggleForm} />
      ) : (
        <LecturerReset toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default LecturerToggle;
