import React, {createRef, useContext, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Alert} from 'react-bootstrap'
import {faComment, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {useQuery} from "react-query";
import {EditIcon} from "./EditIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function User({userHash, userName, lastName, email}) {
  return (
    <Card className="mb-3 shadow-sm bg-light">
      <Row noGutters>
        <Col md={2} className="p-3 align-self-center">
          <img src={`https://www.gravatar.com/avatar/${userHash}?s=100`}
               className="card-img restaurants-review-avatar"/>
          {/*<p className="text-center restaurants-review-username"><small>{userName}</small></p>*/}
        </Col>
        <Col md>
          <Card.Body>
            <Card.Title>
              <Row>
              <Col className="text-nowrap">
                {userName} {lastName}
              </Col>
              <Col className="small text-right text-muted">
                Visitor
              </Col>
              </Row>
            </Card.Title>
            <Card.Text>
              {email}
            </Card.Text>
            <Card.Text>
              <Row>
                <Col>
                  <EditIcon className="small"/>
                </Col>
                <Col>
                  <small className="text-muted float-right pt-1">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                   0
                  </small>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export function Users() {
  const { status, data, error } = useQuery(
    ['users', {} ],
    async (key) => {
      console.log(key);
      let d = await fetch('/users.json');
      let j = await d.json();
      return j;
    }
  );

  return (
    <>
      {
        status=='success' &&
          (data? data.map(u =><User userName={u.first_name}
                                    userHash={u.email_hash}
                                    lastName={u.last_name} email={u.email}/>):
                 <Alert variant="secondary">No users.</Alert>)
      }
    </>
  );
}