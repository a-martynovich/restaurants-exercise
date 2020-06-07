import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";


export function Stars({staticRating, initialRating, onSelect}) {
  const isStatic = (staticRating !== undefined);
  const [rating, setRating] = useState(isStatic? staticRating: initialRating);
  const onHoverStart = (e, i) => {
    setRating(i+1);
  };
  const onHoverEnd = (e, i) => {
    if(!isStatic) {
      setRating(initialRating)
    }
  };
  const getStar = (i, r, f) => {
    if(r > i) {
      if(r < i+1)
        return f("half");
      else
        return f("full");
    } else {
      return f("none");
    }
  };

  useEffect(() => {
    if(isStatic)
      setRating(staticRating);
    else
      setRating(initialRating);
  }, [isStatic, staticRating, initialRating]);

  return (
      <>
        {[...Array(5).keys()].map(i => getStar(i, rating, (star) => {
            if(star == "half" && isStatic)
              return (
                  <span className="fa-layers fa-fw" key={i*3}>
                    <FontAwesomeIcon icon={faStar} color="black" key={i*3+1}/>
                    <FontAwesomeIcon icon={faStarHalf} color="gold" key={i*3+2}/>
                  </span>
              );
            else {
              let color = "gray";
              if(star == "full") {
                color = "gold";
              }
              return (
                <FontAwesomeIcon icon={faStar} color={color}
                             onMouseEnter={isStatic? null: (e) => onHoverStart(e, i)}
                             onMouseLeave={isStatic? null: (e) => onHoverEnd(e, i)}
                             onClick={() => onSelect(i+1)}
                             key={i}/>
              )
            }
          })
        )}
      </>
  );
}
