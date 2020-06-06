import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useQuery } from 'react-query'

import {Reviews} from "./Reviews";
import {Stars} from "./Stars";
import {Card, Row, Col, Form, FormGroup, Button} from "react-bootstrap";


export function Restaurant({id}) {
  const [startDate, setStartDate] = useState(null);
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
              Reviews (0)
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
              <Row className="mb-2">
                <Col>
                  <span className="d-flex flex-nowrap d-inline-flex mr-2">
                    <Stars />
                  </span>
                  <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                                          todayButton="Today" placeholderText="Last visit date" maxDate={new Date()}
                                          className="form-control border-primary d-inline-flex"/>
                </Col>
              </Row>
              <Row className="container">
                <Form.Group className="w-100">
                  {/*<label htmlFor="exampleFormControlTextarea1">Review:</label>*/}
                  <Form.Control as="textarea" className="w-100 border-primary" rows="3" placeholder="Tell us what you think"/>
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">Submit review</Button>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
  );
}
