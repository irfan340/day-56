import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>            
            <NavLink to="/user">Users</NavLink>            
            <NavLink to="/signup">Sign up</NavLink>            
            <NavLink to="/signin">sign In</NavLink>            
        </div>
    );
};

export default Header;