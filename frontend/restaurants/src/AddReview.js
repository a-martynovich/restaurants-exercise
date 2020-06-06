import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Stars} from "./Stars";
import DatePicker from "react-datepicker";
import React, {useState} from "react";


export function AddReview() {
  const [startDate, setStartDate] = useState(null);

  return (
    <>
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
    </>
  )
}