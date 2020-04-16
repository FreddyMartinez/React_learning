import React from "react";
import PropTypes from "prop-types";

const Navbar = ({title, icon}) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "My App",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
