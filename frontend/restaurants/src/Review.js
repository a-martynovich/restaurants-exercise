import React, {useContext, useState} from "react";
import { parseISO, format } from 'date-fns';

import {Stars} from "./Stars";
import {Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {EditIcon} from "./EditIcon";
import {LoginContext} from "./Login";
import {queryCache, useMutation} from "react-query";
import {fetchJSON} from "./Fetch";
import DatePicker from "react-datepicker";


function EditReview({id, shown, onClose, data}) {
  const [startDate, setStartDate] = useState(parseISO(data.lastVisit));
  const [comment, setComment] = useState(data.comment);
  const [rating, setRating] = useState(data.rating);
  const [mutate] = useMutation(async (e) => {
    console.log(e);
    let res = await fetchJSON({
        method: 'PATCH',
        url: `reviews/${e.id}/`,
        body: e.body
      });
      return res.reviews;
  }, {
    onSuccess: async (replyData) => {
      console.log(replyData);
      queryCache.setQueryData(['reviews', {id: data.restaurantId}], replyData);
      await queryCache.refetchQueries(['restaurant', {id: data.restaurantId}]);
      onClose();
    }
  });

  const formRef = React.createRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let formData = Object.fromEntries(new FormData(formRef.current));
    formData.rating = rating;
    formData.restaurant = data.restaurantId;
    await mutate({
      id,
      body: formData
    });
  };
  const onTextChange = (e) => {
    setComment(e.target.value);
    console.log((startDate && comment && rating));
  };
  const submitAllowed = !!(startDate && comment && rating);

  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data &&
        <Form onSubmit={onSubmit} ref={formRef} name="review">
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
                          onChange={onTextChange} defaultValue={comment} name="comment"/>
          </Form.Group>
        </Row>
        </Form>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={!submitAllowed}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


function AddReply({reviewId}) {
  const [submitAllowed, setSubmitAllowed] = useState(false);
  const [mutate] = useMutation(async (e) => {
    let res = await fetchJSON({
        method: 'POST',
        url: `reply/${e.id}/`,
        body: e.body
      });
      return res;
  }, {
    onSuccess: async () => await queryCache.refetchQueries(['reviews'])
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = Object.fromEntries(new FormData(e.target));
    data.review = reviewId;
    await mutate({id: reviewId, body: data});
  };
  const onChange = (e) => {
    setSubmitAllowed(!!e.target.value);
  };

  return (
      <form onSubmit={onSubmit} name="reply">
        <textarea rows="3" className="w-100 small" placeholder="Your reply here." name="comment" onChange={onChange}/>
        <Button type="submit" size="sm" className="float-right mb-1" disabled={!submitAllowed}>Submit</Button>
      </form>
  )
}

export function Review({id, restaurantId, rating, lastVisit, userName, userHash, timestamp, comment,
                       ownerReplyComment, ownerReplyTimestamp, isLatest, isHighest, isLowest}) {
  const ctx = useContext(LoginContext);
  const [showEdit, setShowEdit] = useState(false);
  const isOwner = ctx.role=='owner', isAdmin = ctx.role=='admin';
  const onDelete = () => {

  }

  return (
    <Card className="border-left-0 border-right-0 border-top-0">
      {showEdit && <EditReview  shown={showEdit} id={id} data={{lastVisit, rating, comment, restaurantId}}
                                onClose={() => setShowEdit(false)}/>}

      <Row noGutters>
        <Col md={2} className="pl-3 pt-3 mr-3">
          <img src={`https://www.gravatar.com/avatar/${userHash}?s=100`}
               className="card-img restaurants-review-avatar"/>
          <p className="text-center restaurants-review-username"><small>{userName}</small></p>
        </Col>
        <Col md>
          <Card.Body>
            <span className="align-top flex-nowrap">
              <small><Stars staticRating={rating}/></small>
            </span>
            {isHighest && <Badge pill variant="success">HIGHEST</Badge>}
            {isLowest && <Badge pill variant="danger">LOWEST</Badge>}
            {isLatest && <Badge pill variant="secondary">LATEST</Badge>}
            <small className="float-right mt-1"><b>Last Visit:</b> {lastVisit}</small>
            <Card.Text className="mb-1"><small>
              {comment}
              {isAdmin && <EditIcon className="d-inline pl-2"
                                    onEdit={() => setShowEdit(true)}
                                    onDelete={onDelete}/>}
            </small></Card.Text>
            <Card.Text className="align-bottom mb-0">
              <small className="text-muted">{timestamp}</small>
            </Card.Text>

            {(ownerReplyComment || isOwner) &&
            <div className="mt-2">
              <Card.Text className="ml-5 mb-0">
                <small><b>Owner Reply</b></small>
              </Card.Text>
              <Card.Text className="ml-5 mb-1">
                <small>
                  {isOwner && !ownerReplyComment?
                  <AddReply reviewId={id}/> :
                  ownerReplyComment}
                </small>
              </Card.Text>
              {(!isOwner || ownerReplyComment) && <Card.Text className="align-bottom ml-5 mb-0">
                <small className="text-muted">{ownerReplyTimestamp}</small>
              </Card.Text>}
            </div>}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

