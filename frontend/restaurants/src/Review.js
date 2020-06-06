import React from "react";

import {Stars} from "./Stars";
import {Card, Col, Row} from "react-bootstrap";


export function Review({rating, lastVisit, userName, userHash, timestamp, comment,
                       ownerReplyComment, ownerReplyTimestamp}) {
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
            <small className="float-right mt-1"><b>Last Visit:</b> {lastVisit}</small>
            <Card.Text className="mb-1"><small>
              {comment}
            </small></Card.Text>
            <Card.Text className="align-bottom mb-0">
              <small className="text-muted">{timestamp}</small>
            </Card.Text>

            <div className={`${ownerReplyComment? "": "d-none"} mt-2`}>
              <Card.Text className="ml-5 mb-0">
                <small><b>Owner Reply</b></small>
              </Card.Text>
              <Card.Text className="ml-5 mb-1">
                <small>
                  {ownerReplyComment}
                </small>
              </Card.Text>
              <Card.Text className="align-bottom ml-5 mb-0">
                <small className="text-muted">{ownerReplyTimestamp}</small>
              </Card.Text>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

