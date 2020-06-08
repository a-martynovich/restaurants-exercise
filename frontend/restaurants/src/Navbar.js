import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUser, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";

import {RatingFilter} from "./RatingFilter";
import {Button, ButtonGroup, Container, Nav, Navbar, OverlayTrigger, Tooltip, Dropdown} from "react-bootstrap";
import {LoginContext} from "./Login";

export function NavBar({backButtonVisible, showUsers, onShowUsers, onBack, onAddRestaurant}) {
  const ctx = useContext(LoginContext);

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
    // To be called when we receive "not logged in" error from the server.
    ctx.logOut();
  };
  const onAddClick = (e) => {
    ignoreClick(e);
    onAddRestaurant();
  };
  const onLogoutClick = (e) => {
    ctx.logOut();
  };

  const firstBtnActive = showUsers? "": "active";
  const secondBtnActive = !showUsers? "": "active";

  return(
      <Navbar expand="sm" className="rounded sticky-top bg-secondary shadow" variant="dark" size="sm">
        {ctx.loggedIn && ctx.role=='admin'?
        <ButtonGroup>
            <Button variant="secondary"
                    className={`m-0 ${firstBtnActive}`}
                    onClick={(e) => {e.target.blur(); onShowUsers(false);}}>
              Restaurants
            </Button>
            <Button variant="secondary"
                    className={`m-0 ${secondBtnActive}`}
                    onClick={(e) => {e.target.blur(); onShowUsers(true)}}>
              Users
            </Button>
          </ButtonGroup> :
          <Navbar.Brand>Restaurants</Navbar.Brand>
        }
        <Navbar.Toggle/>
        {ctx.loggedIn &&
        <Navbar.Collapse>
          <Container className="p-0">
            {!showUsers ?
            <Nav>
              <Nav.Item style={{visibility: backButtonVisible? "visible": "hidden"}}>
                <Nav.Link onClick={onBackClick}>Back</Nav.Link>
              </Nav.Item>
              <Nav.Item className="flex-nowrap" style={{visibility: !backButtonVisible? "visible": "hidden"}}>
                <RatingFilter/>
              </Nav.Item>
            </Nav>:
            <Nav>
              <Nav.Item>
                <Nav.Link>&nbsp;</Nav.Link>
              </Nav.Item>
            </Nav>}
          </Container>
          <ButtonGroup>
            {ctx.role=='owner' &&
            <OverlayTrigger overlay={<Tooltip id="tooltip-user">Add Restaurant</Tooltip>} placement="bottom" onClick={onLogout}>
              <Button size="sm" variant="outline-light" className="text-nowrap" onClick={onAddClick}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </OverlayTrigger>}
            <OverlayTrigger overlay={<Tooltip id="tooltip-user">{ctx.roleName}</Tooltip>} placement="bottom">
              <Button variant="outline-light" size="sm" className="text-nowrap restaurants-login-btn" onClick={ignoreClick}>
                <FontAwesomeIcon icon={faUser} className="mr-3"/>
                Artem Martynovich
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltip-user">Log Out</Tooltip>} placement="bottom" onClick={onLogout}>
              <Button size="sm" variant="outline-light" className="text-nowrap" onClick={onLogoutClick}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Navbar.Collapse>
        }
      </Navbar>
  );
}
