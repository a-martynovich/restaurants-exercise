import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faMapMarkerAlt, faBell} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {Stars} from "./Stars";
import {Card, Col, Row} from "react-bootstrap";


export function RestaurantCard({id, name, address, summary, reviews_count, average_rating, bell, onClick}) {
  return (
      <Card className="mb-3 shadow-sm restaurants-card">
        <Row>
          {/*<div className="col-md-4">*/}
          {/*  <img src="https://via.placeholder.com/150x70" className="card-img" alt="..." />*/}
          {/*</div>*/}
          <Col md>
            <Card.Body className="pb-2">
              <Card.Title as="h5" className="d-inline-block">
                <a href="#" className="stretched-link" onClick={onClick}>{name}</a>
              </Card.Title>
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={average_rating}/>
                <small className="text-muted align-text-top pl-2">{average_rating}</small>
              </span>
              <Card.Text className="text-justify">{summary}</Card.Text>
              <hr className="mt-0 mb-1"/>
              <Card.Text className="card-text">
                <small className="text-muted">
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
                  {address}
                </small>
                <small className="text-muted float-right pt-1">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  {reviews_count}
                </small>
                {bell && <small  className="text-muted float-right pt-1">
                  <FontAwesomeIcon icon={faBell} color="orange" className="mr-2" />
                </small>}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
  );
}

