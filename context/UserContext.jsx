import React, { createContext, useState } from "react";

export const UserContext = createContext("Usuario");

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("Usuario");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
