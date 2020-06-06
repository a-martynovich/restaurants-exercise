import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {RatingFilter} from "./RatingFilter";
import {Button, ButtonGroup, Container, Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";


export function NavBar({backButtonVisible, onBack}) {
  const ignoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.blur();
  };
  const onBackClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onBack();
  };
  const onLogout = (e) => {

  };

  return(
      <Navbar expand="sm" className="rounded sticky-top bg-secondary shadow" variant="dark" size="sm">
        <Navbar.Brand>Restaurants</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Container>
            <Nav>
              <Nav.Item style={{visibility: backButtonVisible? "visible": "hidden"}}>
                <Nav.Link onClick={onBackClick}>Back</Nav.Link>
              </Nav.Item>
              <Nav.Item className="flex-nowrap" style={{visibility: !backButtonVisible? "visible": "hidden"}}>
                <RatingFilter/>
              </Nav.Item>
            </Nav>
          </Container>
          <ButtonGroup>
            <OverlayTrigger overlay={<Tooltip id="tooltip-user">Visitor</Tooltip>} placement="bottom">
              <Button variant="outline-light" size="sm" className="text-nowrap restaurants-login-btn" onClick={ignoreClick}>
                <FontAwesomeIcon icon={faUser} className="mr-3"/>
                Artem Martynovich
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltip-user">Log Out</Tooltip>} placement="bottom" onClick={onLogout}>
              <Button size="sm" variant="outline-light" className="text-nowrap">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Navbar.Collapse>
      </Navbar>
  );
}
