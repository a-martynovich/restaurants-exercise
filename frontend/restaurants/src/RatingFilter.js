import React, {createRef, useContext, useState} from "react";

import {Stars} from "./Stars";
import {Nav} from "react-bootstrap";

export const FilterContext = React.createContext(null);


export function RatingFilter({onSelect}) {
  const [ratingHover, setRatingHover] = useState(false);
  const [rating, setRating] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [setFilterRating] = useContext(FilterContext);

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
    // console.log('selected', i, setFilterRating);
    setExpanded(true);
    setRating(i);
    setFilterRating(i);

  };
  const onStarReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setExpanded(false);
    setRatingHover(false);
    setRating(0);
    setFilterRating(0);
  };

  // console.log(`RATING: ${rating} ctx: ${setFilterRating}`);
  return (
      <Nav.Link as="span" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} ref={spanRef}>
        <Nav.Link className="nav-link d-inline" href="">Rating: </Nav.Link>
        {!expanded &&
        <a className={`text-light ${ratingHover ? "d-none" : "d-inline"}`} href="#" tabIndex="-1"><u>All</u></a>
        }
        {(ratingHover || expanded) &&
        <Stars initialRating={rating} onSelect={onStarSelect}/>
        }
        {expanded &&
        <Nav.Link className="d-inline text-light text-sm-center" href="" tabIndex="-1" onClick={onStarReset}>
          <u><small>Reset</small></u>
        </Nav.Link>
        }
      </Nav.Link>
  )
}
