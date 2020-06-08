import React, {createRef, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Button, InputGroup, FormControl} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faKey} from "@fortawesome/free-solid-svg-icons";

export const LoginContext = React.createContext();


export function Login({onSignUp, onSuccess}) {
  useEffect(() => {
    // onSuccess();
  });

  return (
    <Col className="col-lg-4 col-md-6 align-self-end">
      <Card className="bg-light align-middle shadow rounded-lg">
        <Card.Body>
          <h4 className="card-title text-center">Log In</h4>
          <hr/>
          <form method="post">
            <InputGroup className="mb-3">
              <FormControl type="email" placeholder="E-Mail" required autoComplete="email"/>
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faAt}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl type="password" placeholder="Password" required autoComplete="current-password"/>
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faKey}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <hr />

            <Button type="submit" variant="primary" className="mr-1" onClick={onSuccess}>Log In</Button>
            <Button variant="secondary" onClick={onSignUp}>Sign Up</Button>

          </form>
        </Card.Body>
      </Card>
    </Col>
  )
}
