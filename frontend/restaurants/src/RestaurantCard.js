import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {Stars} from "./Stars";


export function RestaurantCard() {
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

