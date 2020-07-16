import React from "react";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min";
import { connect } from "react-redux";
import { deleteTech } from "../../actions/techActions";

const TechItem = ({ tech: { id, firstName, lastName }, deleteTech }) => {
  const onDelete = () => {
    deleteTech(id);
    M.toast({ html: `Technician ${firstName} has been deleted` });
  };

  return (
    <li>
      <div>
        {firstName} {lastName}
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icon grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired
};

export default connect(null, { deleteTech })(TechItem);
