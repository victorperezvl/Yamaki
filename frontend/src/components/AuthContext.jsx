import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user) => {
      localStorage.setItem("user", JSON.stringify(user)); // Guarda el objeto completo
      setUser(user);
    };
  

    const logout = (user) => {
        localStorage.removeItem("user", JSON.stringify(user));
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );

};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default AuthContext; 