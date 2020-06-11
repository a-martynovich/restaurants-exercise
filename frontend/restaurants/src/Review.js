import React, {useContext, useState} from "react";

import {Stars} from "./Stars";
import {Badge, Button, Card, Col, Form, Row} from "react-bootstrap";
import {EditIcon} from "./EditIcon";
import {LoginContext} from "./Login";
import {queryCache, useMutation} from "react-query";
import {fetchJSON} from "./Fetch";


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

export function Review({id, rating, lastVisit, userName, userHash, timestamp, comment,
                       ownerReplyComment, ownerReplyTimestamp, isLatest, isHighest, isLowest}) {
  const ctx = useContext(LoginContext);
  const isOwner = ctx.role=='owner', isAdmin = ctx.role=='admin';

  return (
    <Card className="border-left-0 border-right-0 border-top-0">
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
              {isAdmin && <EditIcon className="d-inline pl-2"/>}
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

