import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Stars} from "./Stars";
import DatePicker from "react-datepicker";
import React, {useState} from "react";
import {queryCache, useMutation} from "react-query";
import {fetchJSON} from "./Fetch";


export function AddReview({restaurantId}) {
  const [startDate, setStartDate] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [mutate] = useMutation(async (e) => {
    console.log(e);
    let res = await fetchJSON({
        method: 'POST',
        url: `http://localhost:8000/reviews/${e.id}/`,
        body: e.body
      });
      return res.reviews;
  }, {
    onSuccess: async (data) => {
      setStartDate(null);
      setComment("");
      setRating(0);

      console.log(data);
      queryCache.setQueryData(['reviews', {id: restaurantId}], data);
      queryCache.refetchQueries(['restaurant', {id: restaurantId}]);
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = Object.fromEntries(new FormData(e.target));
    data.rating = rating;
    data.restaurant = restaurantId;
    await mutate({
      id: restaurantId,
      body: data
    });
  };
  const onTextChange = (e) => {
    setComment(e.target.value);
    console.log((startDate && comment && rating));
  };
  const submitAllowed = !!(startDate && comment && rating);

  return (
    <Form onSubmit={onSubmit} name="review">
      <Row className="mb-2">
        <Col>
          <span className="d-flex flex-nowrap d-inline-flex mr-2">
            <Stars onSelect={setRating} initialRating={rating}/>
          </span>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                                  dateFormat="yyyy-MM-dd"
                                  todayButton="Today" placeholderText="Last visit date" maxDate={new Date()}
                                  className="form-control border-primary d-inline-flex" name="visited_at"/>
        </Col>
      </Row>
      <Row className="container">
        <Form.Group className="w-100">
          {/*<label htmlFor="exampleFormControlTextarea1">Review:</label>*/}
          <Form.Control as="textarea" className="w-100 border-primary" rows="3" placeholder="Tell us what you think"
                        onChange={onTextChange} value={comment} name="comment"/>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" disabled={!submitAllowed}>Submit review</Button>
    </Form>
  )
}