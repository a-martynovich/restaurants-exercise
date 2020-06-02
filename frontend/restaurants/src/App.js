import 'bootstrap/dist/js/bootstrap.js';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';

import React, {createRef, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSignOutAlt, faUser, faUserTie, faUserCog, faStarHalf,
  faMapMarker, faMapMarkerAlt, faHistory, faComment, faCommentAlt } from '@fortawesome/free-solid-svg-icons'

import DatePicker from 'react-datepicker'
import './App.css';


function Card() {
  return (
      <div className="card mb-3 shadow-sm restaurants-card">
        <div className="row">
          {/*<div className="col-md-4">*/}
          {/*  <img src="https://via.placeholder.com/150x70" className="card-img" alt="..." />*/}
          {/*</div>*/}
          <div className="col-md">
            <div className="card-body pb-2">
              <h5 className="card-title d-inline-block">
                <a href="" className="stretched-link">Restaurant Name</a>
              </h5>
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={4.1}/>
                <small className="text-muted align-text-top pl-2">4.1</small>
              </span>
              <p className="card-text text-justify">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
              <hr className="mt-0 mb-1"/>
              <p className="card-text">
                <small className="text-muted">
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
                  15 Šetalište Kapetana Iva Vizina, Tivat
                </small>
                <small className="text-muted float-right pt-1">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  0
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

function Stars({staticRating, initialRating, onSelect}) {
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

function Navbar({backButtonVisible}) {
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

function RestaurantList() {
  return (
    <>
      <Card/>
      <Card/>
      <Card/>
      {/*<Card/>*/}
      {/*<Card/>*/}
      {/*<Card/>*/}
      {/*<Card/>*/}
      {/*<Card/>*/}
    </>
  );
}

function Review() {
  return (
    <div className="card border-left-0 border-right-0 border-top-0">
      <div className="row no-gutters">
        <div className="col-md-2 pl-3 pt-3 mr-3">
          <img src="https://www.gravatar.com/avatar/ec85fcb559b6101d45b406cae3b6f29a?s=100"
               className="card-img restaurants-review-avatar"/>
          <p className="text-center restaurants-review-username"><small>Artem</small></p>
        </div>
        <div className="col-md">
          <div className="card-body">
            <span className="align-top flex-nowrap">
              <Stars staticRating={4}/>
              {/*<small className="text-muted align-text-top pl-2">4.1</small>*/}
              <small className="float-right"><b>Last Visit:</b> {new Date().toLocaleDateString()}</small>
            </span>
            <p className="card-text mb-1"><small>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </small></p>
            <p className="card-text align-bottom mb-0">
              <small className="text-muted">{new Date().toLocaleString()}</small>
            </p>

            <div className="d-none mt-2">
              <p className="card-text ml-5 mb-0">
                <small><b>Owner Reply</b></small>
              </p>
              <p className="card-text ml-5 mb-1">
                <small>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </small>
              </p>
              <p className="card-text align-bottom ml-5 mb-0">
                <small className="text-muted">{new Date().toLocaleString()}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Restaurant() {
  const [startDate, setStartDate] = useState(null);

  return (
      <div className="card mb-3">
        {/*<img src="https://via.placeholder.com/150x70" className="card-img-top restaurant-card-img" alt="..." />*/}
        <div className="card-body">
          <p className="text-center mb-1">
            <h3 className="card-title  d-inline-block mb-0">Restaurant Name</h3>
          </p>

          <small className="text-muted d-block mb-3 text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
            15 Šetalište Kapetana Iva Vizina, Tivat
          </small>

          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p className="card-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
            est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
            tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
            illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>

          <div className="card mt-2">
            <h6 className="card-header">
              Reviews (0)
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={4.0}/>
                <span className="text-muted align-text-top pl-2 mt-1">4.0</span>
            </span>
            </h6>
            <div className="card-body p-0">
              <div className="row row-cols-1 no-gutters">
                <div className="col-md">

                  {/*<div className="row">*/}
                  {/*  <div className="col-md-1">*/}
                  {/*      <img src="https://www.gravatar.com/avatar/ec85fcb559b6101d45b406cae3b6f29a?s=100" className="card-img" />*/}
                  {/*      <small className="text-nowrap">Artem Martynovich</small>*/}
                  {/*  </div>*/}
                  {/*  */}
                  {/*</div>*/}

                  <Review/>
                  <Review/>

                </div>
              </div>
            </div>
          </div>

          <div className="card mt-2">
            <h6 className="card-header">
              Add Review
            </h6>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col">
                  <span className="d-flex flex-nowrap d-inline-flex mr-2">
                    <Stars />
                  </span>
                  <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                                          todayButton="Today" placeholderText="Last visit date" maxDate={new Date()}
                                          className="form-control border-primary d-inline-flex"/>
                </div>
              </div>
              <div className="row container">
                <div className="form-group w-100">
                  {/*<label htmlFor="exampleFormControlTextarea1">Review:</label>*/}
                  <textarea className="form-control w-100 border-primary" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us what you think"/>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">Submit review</button>
            </div>
          </div>
        </div>
      </div>
  );
}

function App() {
  return (
    <div className="restaurants-main container bg-white">
      <Navbar backButtonVisible={true}/>

      <div className="justify-content-center mt-3 row">
        <div className="col col-md-9">
          <Restaurant/>
        </div>
      </div>
    </div>
  );
}

export default App;
