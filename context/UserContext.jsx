import React, { createContext, useState } from "react";

export const UserContext = createContext({
  username: "Usuario",
  email: "",
  setUsername: () => {},
  setEmail: () => {},
});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("Usuario");
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};