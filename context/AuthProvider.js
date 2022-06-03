import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => {
          // Communicate with the backend and store in Secure Store
          setUser("Kings");
        },
        logout: () => {
          setUser(null)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
