import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import React, {createRef, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSignOutAlt, faUser, faUserTie, faUserCog, faStarHalf } from '@fortawesome/free-solid-svg-icons'

import './App.css';

function Card() {
  return (
      <div className="card mb-3 restaurants-card">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://via.placeholder.com/150x100" className="card-img" alt="..." />
          </div>
          <div className="col-md">
            <div className="card-body">
              <h5 className="card-title d-inline-block ml-5">Card title</h5>
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={4.1}/>
                <small className="text-muted align-text-top pl-2">4.1</small>
              </span>
              <p className="card-text text-justify">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
  );
}

function Stars({staticRating, initialRating, onSelect}) {
  const isStatic = (staticRating !== undefined);
  const [rating, setRating] = useState(isStatic? staticRating: initialRating);
  const onHoverStart = isStatic? () => {} : (e, i) => {
    setRating(i+1);
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
              let color = "";
              if(star == "full") {
                color = "gold";
              }
              return (
                <FontAwesomeIcon icon={faStar} color={color}
                             onMouseEnter={isStatic? null: (e) => onHoverStart(e, i)}
                             onClick={() => onSelect(i+1)}
                             key={i}/>
              )
            }
          })
        )}
      </>
  );
}

function RatingFilter() {
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
  const onStarReset = (i) => {
    setExpanded(false);
    setRatingHover(false);
  };

  return (
      <span className="nav-link" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} ref={spanRef}>
        <a className="nav-link d-inline" href="#">Rating: </a>
        {!expanded && <a className={`text-primary ${ratingHover? "d-none": "d-inline"}`} href="#" tabIndex="-1"><u>All</u></a>}
        {(ratingHover || expanded) && <Stars initialRating={2} onSelect={onStarSelect}/>}
        {expanded && <a className="nav-link d-inline text-primary text-sm-center" href="#" tabIndex="-1" onClick={onStarReset}><small>Reset</small></a>}
      </span>
  )
}

function Navbar() {
  const ignoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.blur();
  };

  return(
      <nav className="navbar navbar-expand-sm restaurants-card sticky-top navbar-light bg-light">
        <a className="navbar-brand" href="#">Restaurants</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item flex-nowrap">
              <RatingFilter/>
            </li>
          </ul>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-primary text-nowrap restaurants-login-btn"
                    data-toggle="tooltip" data-placement="bottom" title="Visitor" tabIndex="-1" onClick={ignoreClick}>
              <FontAwesomeIcon icon={faUser} className="mr-3"/>
              Artem Martynovich
            </button>
            <button type="button" className="btn btn-outline-primary text-nowrap"
                    data-toggle="tooltip" data-placement="bottom" title="Log Out">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </nav>
  );
}

function App() {
  return (
    <div className="App container">
      <Navbar/>

      <div className="cardWrapper justify-content-center mt-3">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
}

export default App;
