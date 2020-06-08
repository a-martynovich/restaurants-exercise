import React, {createRef, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Button, InputGroup, Form} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faKey} from "@fortawesome/free-solid-svg-icons";


function SignUpDialog({onBack, onSignupClick}) {
  return (
    <Col className="col-lg-5 col-md-8 align-self-end">
      <Card className="bg-light align-middle shadow rounded-lg">
        <Card.Body>
          <h4 className="card-title text-center">Sign Up</h4>
          <hr/>
          <form method="post" >
            <Form.Row className="mb-3">
              <Col md={3} lg={3} sm={3} className="text-nowrap">
                <Form.Label column lg={2}>
                  Role:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control as="select">
                  <option>Visitor</option>
                  <option>Owner</option>
                  <option>Admin</option>
                </Form.Control>
              </Col>
            </Form.Row>
            <Form.Row className="mb-3">
              <Col className="p-0 pr-2">
                <Form.Control placeholder="First Name" required/>
              </Col>
              <Col className="p-0">
                <Form.Control placeholder="Last Name" required/>
              </Col>
            </Form.Row>
            <Form.Row>
              <InputGroup className="mb-3">
                <Form.Control type="email" placeholder="E-Mail" required autoComplete="email"/>
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faAt}/>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Row>
            <Form.Row>
              <Col className="p-0 pr-2">
                <InputGroup className="mb-1">
                  <Form.Control type="password" placeholder="Password" required autoComplete="new-password"/>
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faKey}/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col className="p-0">
                <InputGroup className="mb-1">
                  <Form.Control type="password" placeholder="Repeat Password" required autoComplete="new-password"/>
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faKey} color="blue"/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
            <hr />

            <Button type="submit" variant="primary" className="mr-1" onClick={onSignupClick}>Sign Up</Button>
            <Button variant="secondary" onClick={onBack}>Back</Button>

          </form>
        </Card.Body>
      </Card>
    </Col>
  )
}

function SignUpSuccess({needApproval}) {
  return (
      <Col className="col-lg-5 col-md-8 align-self-end">
        <Card className="text-success align-middle shadow rounded-lg" variant="success">
          <Card.Body>
            <Card.Title as="h4" className="text-center">Success!</Card.Title>
            <hr/>
            <Card.Text className="text-center">
              {needApproval? "You may login after being approved by the Manager.": "You may now login."}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
  );
}

export function SignUp({onSuccess, onBack}) {
  const [success, setSuccess] = useState(false);
  const onSignupClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
      success? <SignUpSuccess/>: <SignUpDialog onBack={onBack} onSignupClick={onSignupClick} />
  );
}