import React, {createRef, useState} from "react";

import {Stars} from "./Stars";


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
      <span className="nav-link" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} ref={spanRef}>
        <a className="nav-link d-inline" href="">Rating: </a>
        {!expanded &&
          <a className={`text-light ${ratingHover? "d-none": "d-inline"}`} href="" tabIndex="-1"><u>All</u></a>
        }
        {(ratingHover || expanded) &&
          <Stars initialRating={2} onSelect={onStarSelect}/>
        }
        {expanded &&
          <a className="nav-link d-inline text-light text-sm-center" href="" tabIndex="-1" onClick={onStarReset}>
            <u><small>Reset</small></u>
          </a>
        }
      </span>
  )
}
