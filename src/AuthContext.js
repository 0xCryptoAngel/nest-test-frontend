import { createContext, useState } from "react";

// Initialize AuthContext with a default value
const AuthContext = createContext({
  user: null,
  roles: [],
  signin: () => {},
  signout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const signin = (userData, userRoles, callback) => {
    setUser(userData);
    setRoles(userRoles);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to local storage
    localStorage.setItem("roles", JSON.stringify(userRoles)); // Save roles to local storage
    if (callback) callback();
  };

  const signout = (callback) => {
    setUser(null);
    setRoles([]);
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ user, roles, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
