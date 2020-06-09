import React, {createRef, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Button, InputGroup, FormControl, Form, Alert} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faKey} from "@fortawesome/free-solid-svg-icons";
import {useMutation} from "react-query";
import {fetchJSON} from "./Fetch";

export const LoginContext = React.createContext();


export function Login({onSignUp, onSuccess}) {
  const [loginMutate, {status, data, error, reset}] = useMutation(fetchJSON, {
    onSuccess: async (data) => {
      onSuccess();
    }
  });
  const onLogIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let fd = new FormData(e.target);
    let d = Object.fromEntries(fd);
    console.log(d);
    await loginMutate({
      method: 'POST',
      url: 'http://localhost:8000/login/',
      body: {
        username: d.email,
        password: d.password
      }
    });
  };
  const resetError = () => reset();
  const getError = () => {
    if(error)
      console.log('ERROR', error);
    return error.body? error.body.error: (error.text || error.message);
  };

  return (
    <Col className="col-lg-4 col-md-6 align-self-end">
      <Card className="bg-light align-middle shadow rounded-lg">
        <Card.Body>
          <h4 className="card-title text-center">Log In</h4>
          <hr/>
          <Form id="myForm" name="myForm" onSubmit={onLogIn}>
            <InputGroup className="mb-3">
              <Form.Control type="email" name="email" id="email"
                            placeholder="E-Mail" required autoComplete="email"
                            onChange={resetError}/>
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faAt}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control type="password" name="password" id="password"
                            placeholder="Password" required autoComplete="current-password"
                            onChange={resetError}/>
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faKey}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            {error && <Alert variant="danger">{getError()}</Alert>}

            <hr />

            <Button type="submit" variant="primary" className="mr-1">Log In</Button>
            <Button variant="secondary" onClick={onSignUp}>Sign Up</Button>

          </Form>
        </Card.Body>
      </Card>
    </Col>
  )
}
