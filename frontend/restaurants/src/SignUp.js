import React, {createRef, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Button, InputGroup, Form} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faKey} from "@fortawesome/free-solid-svg-icons";


export function SignUp() {
  return (
    <Col className="col-lg-5 col-md-8 align-self-end">
      <Card className="bg-light align-middle shadow rounded-lg">
        <Card.Body>
          <h4 className="card-title text-center">Sign Up</h4>
          <hr/>
          <form method="post" >
            <Form.Row className="mb-3">
              <Form.Label column lg={2}>
                Role:
              </Form.Label>
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
                <Form.Control type="email" placeholder="E-Mail" required/>
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
                  <Form.Control type="password" placeholder="Password" required/>
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faKey}/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col className="p-0">
                <InputGroup className="mb-1">
                  <Form.Control type="password" placeholder="Repeat Password" required/>
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faKey} color="blue"/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
            <hr />

            <Button type="submit" variant="primary" className="mr-1">Sign Up</Button>
            <Button variant="secondary">Back</Button>

          </form>
        </Card.Body>
      </Card>
    </Col>
  )
}