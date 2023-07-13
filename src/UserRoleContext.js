import React, { createContext, useState } from "react";

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Add isAuthenticated state

  const handleLogin = (role) => {
    setUserRole(role);
    //   setIsAuthenticated(true); // Set isAuthenticated to true upon successful login
  };

  // const handleLogout = () => {
  //   setUserRole("");
  //   setIsAuthenticated(false); // Set isAuthenticated to false upon logout
  // };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <UserRoleContext.Provider
      value={{
        userRole,
        handleLogin,
        setUserRole,
        isSidebarOpen,
        handleSidebarToggle,
        // isAuthenticated, // Add isAuthenticated value
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};
