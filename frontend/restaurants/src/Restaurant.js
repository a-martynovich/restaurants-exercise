import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useQuery } from 'react-query'

import {Card, Row, Col, Form, FormGroup, Button} from "react-bootstrap";

import {AddReview} from "./AddReview";
import {Reviews} from "./Reviews";
import {Stars} from "./Stars";


export function Restaurant({id}) {
  const { status, data, error } = useQuery(
    ['restaurant', { id }],
    async (key, {id}) => {
      // console.log(key, id);
      let d = await fetch('/restaurant.json');
      let j = await d.json();
      return j;
    }
  );

  // console.log(status, data, error);
  let disp_data = data;
  if(status == 'loading') {
    disp_data = {name: '', address: '', short_description: '', long_description: ''};
  }

  return (
      <Card className="mb-3">
        {/*<img src="https://via.placeholder.com/150x70" className="card-img-top restaurant-card-img" alt="..." />*/}
        <Card.Body>
          <p className="text-center mb-1">
            <Card.Title as="h3" className="d-inline-block mb-0">{disp_data.name}</Card.Title>
          </p>

          <small className="text-muted d-block mb-3 text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
            {disp_data.address}
          </small>

          <Card.Text>{disp_data.short_description}</Card.Text>
          <Card.Text>{disp_data.long_description}</Card.Text>

          <Card className="mt-2">
            <Card.Header>
              Reviews ({disp_data.reviews_count})
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={disp_data.average_rating}/>
                <span className="text-muted pl-2">{disp_data.average_rating}</span>
            </span>
            </Card.Header>
            <Card.Body className="p-0">
              <Row noGutters>
                <Col md>
                  <Reviews restaurantId={id}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mt-2">
            <Card.Header as="h6">
              Add Review
            </Card.Header>
            <Card.Body>
              <AddReview/>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
  );
}
