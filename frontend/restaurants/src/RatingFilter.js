import React, {createRef, useState} from "react";

import {Stars} from "./Stars";
import {Nav} from "react-bootstrap";


export function RatingFilter() {
  const [ratingHover, setRatingHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const spanRef = createRef();
  const onMouseOver = (e) => {
    console.log('OVER', e.target, e.currentTarget, spanRef.current);
    setRatingHover(true);
  };
  const onMouseOut = (e) => {
    console.log('OUT');
    setRatingHover(false);
  };
  const onStarSelect = (i) => {
    console.log('selected', i);
    setExpanded(true);
  };
  const onStarReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setExpanded(false);
    setRatingHover(false);
  };

  return (
      <Nav.Link as="span" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} ref={spanRef}>
        <Nav.Link className="nav-link d-inline" href="">Rating: </Nav.Link>
        {!expanded &&
          <a className={`text-light ${ratingHover? "d-none": "d-inline"}`} href="#" tabIndex="-1"><u>All</u></a>
        }
        {(ratingHover || expanded) &&
          <Stars initialRating={2} onSelect={onStarSelect}/>
        }
        {expanded &&
          <Nav.Link className="d-inline text-light text-sm-center" href="" tabIndex="-1" onClick={onStarReset}>
            <u><small>Reset</small></u>
          </Nav.Link>
        }
      </Nav.Link>
  )
}
