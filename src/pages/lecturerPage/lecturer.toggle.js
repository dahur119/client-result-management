// StudentFormToggle.js
import React, { useState } from "react";
import LecturerResultForm from "./lecturer.submit.result";
import LecturerUpdateForm from "./lecturer.update";

const LecturerFormToggle = () => {
  const [isLoginVisible, setLoginVisible] = useState(true);

  const toggleForm = () => {
    setLoginVisible(!isLoginVisible);
  };

  return (
    <div>
      {isLoginVisible ? (
        <LecturerResultForm toggleForm={toggleForm} />
      ) : (
        <LecturerUpdateForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default LecturerFormToggle;
