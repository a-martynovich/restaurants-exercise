import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Stars} from "./Stars";
import DatePicker from "react-datepicker";
import React, {useState} from "react";
import {queryCache, useMutation} from "react-query";


export function AddReview({restaurantId}) {
  const [startDate, setStartDate] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [mutate] = useMutation(async (e) => {
    console.log(e);
    let d = await fetch('/reviews.json');
    let j = await d.json();
    return [j[0]];
  }, {
    onSuccess: async (data) => {
      setStartDate(null);
      setComment("");
      setRating(0);

      console.log(data);
      queryCache.setQueryData(['reviews', {id: restaurantId}], data);
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await mutate();
  };
  const onTextChange = (e) => {
    setComment(e.target.value);
    console.log((startDate && comment && rating));
  };
  const submitAllowed = !!(startDate && comment && rating);

  return (
    <>
      <Row className="mb-2">
        <Col>
          <span className="d-flex flex-nowrap d-inline-flex mr-2">
            <Stars onSelect={setRating} initialRating={rating}/>
          </span>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                                  todayButton="Today" placeholderText="Last visit date" maxDate={new Date()}
                                  className="form-control border-primary d-inline-flex"/>
        </Col>
      </Row>
      <Row className="container">
        <Form.Group className="w-100">
          {/*<label htmlFor="exampleFormControlTextarea1">Review:</label>*/}
          <Form.Control as="textarea" className="w-100 border-primary" rows="3" placeholder="Tell us what you think"
                        onChange={onTextChange} value={comment}/>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" onClick={onSubmit} disabled={!submitAllowed}>Submit review</Button>
    </>
  )
}