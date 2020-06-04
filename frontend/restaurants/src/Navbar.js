import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {RatingFilter} from "./RatingFilter";


export function Navbar({backButtonVisible}) {
  const ignoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.blur();
  };

  return(
      <nav className="navbar rounded navbar-expand-sm sticky-top navbar-dark bg-secondary shadow">
        <a className="navbar-brand" href="">Restaurants</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item" style={{visibility: backButtonVisible? "visible": "hidden"}}>
                <a className="nav-link" href="">Back</a>
              </li>
              <li className="nav-item flex-nowrap" style={{visibility: !backButtonVisible? "visible": "hidden"}}>
                <RatingFilter/>
              </li>
            </ul>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-sm btn-outline-light text-nowrap restaurants-login-btn"
                    data-toggle="tooltip" data-placement="bottom" title="Visitor" tabIndex="-1" onClick={ignoreClick}>
              <FontAwesomeIcon icon={faUser} className="mr-3"/>
              Artem Martynovich
            </button>
            <button type="button" className="btn btn-sm btn-outline-light text-nowrap"
                    data-toggle="tooltip" data-placement="bottom" title="Log Out">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </nav>
  );
}
