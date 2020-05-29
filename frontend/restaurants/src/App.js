import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import React, {createRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
              <span className="restaurants-stars-span d-inline-block ml-5 float-right"><Stars/></span>
              <p className="card-text text-justify">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
  );
}

function Stars() {
  const [rating, setRating] = useState(0);
  const onHoverStart = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('HOVER', i);
    setRating(i);
  };
  const onHoverEnd = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('UNHOVER', i);
    // setRating(rating);
  };

  return (
      <>
        {[...Array(5).keys()].map(i =>
            <FontAwesomeIcon icon={faStar} color={rating >= i? "gold": ""}
                             onMouseEnter={(e) => onHoverStart(e, i)}
                             onMouseLeave={(e) => onHoverEnd(e, i)} key={i}/>
        )}
      </>
  );
}


function Navbar() {
  const [ratingHover, setRatingHover] = useState(false);
  const ref = createRef();
  const onMouseOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // if(e.target != ref.current)
    //   return;
    console.log('OVER', e.target, e.currentTarget, ref.current);
    setRatingHover(true);
  };
  const onMouseOut = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // if(e.target != ref.current)
    //   return;
    console.log('OUT');
    setRatingHover(false);
  };


  return(
      <nav className="navbar navbar-expand-sm restaurants-card sticky-top navbar-light bg-light">
        <a className="navbar-brand" href="#">Restaurants</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item flex-nowrap">
              <span className="nav-link" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} ref={ref}>
                <a className="nav-link d-inline" href="#">Rating: </a>
                <a className={`text-primary ${ratingHover? "d-none": "d-inline"}`} href="#" tabIndex="-1"><u>All</u></a>
                {ratingHover && <Stars/>}
                {ratingHover && <a className="nav-link d-inline text-primary text-sm-center" href="#" tabIndex="-1"><small>Reset</small></a>}
              </span>
            </li>
          </ul>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-primary text-nowrap pointer-none restaurants-login-btn">Artem Martynovich</button>
            <button type="button" className="btn btn-outline-primary text-nowrap"><FontAwesomeIcon icon={faSignOutAlt} /></button>
          </div>
          {/*<div className="nav-item dropdown">*/}
          {/*    <a className="nav-link dropdown-toggle border border-primary rounded" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"*/}
          {/*       aria-haspopup="true" aria-expanded="false">*/}
          {/*      Artem Martynovich (Visitor)*/}
          {/*    </a>*/}
          {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
          {/*      <a className="dropdown-item" href="#">Log Out</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
        </div>
      </nav>
  );
}

function App() {
  return (
    <div className="App container">
      <Navbar/>

      <div className="cardWrapper justify-content-center">
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
