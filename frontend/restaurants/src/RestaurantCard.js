import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {Stars} from "./Stars";


export function RestaurantCard({id, name, address, short_description, reviews_count, average_rating, onClick}) {
  return (
      <div className="card mb-3 shadow-sm restaurants-card">
        <div className="row">
          {/*<div className="col-md-4">*/}
          {/*  <img src="https://via.placeholder.com/150x70" className="card-img" alt="..." />*/}
          {/*</div>*/}
          <div className="col-md">
            <div className="card-body pb-2">
              <h5 className="card-title d-inline-block">
                <a href="#" className="stretched-link" onClick={onClick}>{name}</a>
              </h5>
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={average_rating}/>
                <small className="text-muted align-text-top pl-2">{average_rating}</small>
              </span>
              <p className="card-text text-justify">{short_description}</p>
              <hr className="mt-0 mb-1"/>
              <p className="card-text">
                <small className="text-muted">
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
                  {address}
                </small>
                <small className="text-muted float-right pt-1">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  {reviews_count}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

