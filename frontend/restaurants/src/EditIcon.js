import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function EditIcon({className}) {
  return (
    <div className={`flex-nowrap ${className}`}>
      <a href="#" className="pr-1">
        <FontAwesomeIcon icon={faEdit} color="green" className="pr-1"/>
        Edit
      </a>
      <a href="#" className="pl-1">
        <FontAwesomeIcon icon={faTrash} color="red" className="pr-1"/>
        Delete
      </a>
    </div>
  );
}
