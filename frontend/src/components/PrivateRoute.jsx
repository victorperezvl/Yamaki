import { useContext } from "react";
import { Navigate } from "react-router-dom"
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.func.isRequired,
};

export default PrivateRoute;