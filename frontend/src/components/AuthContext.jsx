import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({token});
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({token});
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );

};

AuthProvider.propTypes = {
  children: PropTypes.func.isRequired, 
};

export default AuthContext; 