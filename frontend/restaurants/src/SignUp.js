import React, {createRef, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Button, InputGroup, Form, Alert} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faKey} from "@fortawesome/free-solid-svg-icons";
import {useMutation} from "react-query";
import {fetchJSON} from "./Fetch";


function SignUpDialog({onBack, onSignup}) {
  const [mutate, {status, data, error, reset}] = useMutation(fetchJSON, {
    onSuccess: async (data) => {
      console.log('SIGNUP SUCCESS');
      onSignup();
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = Object.fromEntries(new FormData(e.target));
    data.username = data.email;
    await mutate({
      method: 'POST',
      url: 'http://localhost:8000/signup/',
      body: data
    });
  };

  console.log(status, data, error);
  let validation = {}, generic_error;
  if(error) {
    if(error.status==400 && error.body) {
      if(error.body.errors) {
        validation = error.body.errors;
        if (validation.username)
          validation.email = validation.username;
      } else {
        generic_error = error.body.non_field_errors && error.body.non_field_errors[0];
      }
    } else {
      generic_error = error.text || error.message;
    }
  }

  return (
    <Col className="col-lg-5 col-md-8 align-self-end">
      <Card className="bg-light align-middle shadow rounded-lg">
        <Card.Body>
          <h4 className="card-title text-center">Sign Up</h4>
          <hr/>
          <form id="myForm" name="myForm" onSubmit={onSubmit} >
            <Form.Row className="mb-3">
              <Col md={3} lg={3} sm={3} className="text-nowrap">
                <Form.Label column lg={2}>
                  Role:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control as="select" isInvalid={null}>
                  <option>Visitor</option>
                  <option>Owner</option>
                  <option>Admin</option>
                </Form.Control>
                <Form.Control.Feedback>...</Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row className="mb-3">
              <Col className="p-0 pr-2">
                <Form.Control placeholder="First Name" required name="first_name"
                              isInvalid={validation.first_name} onChange={reset}/>
                <Form.Control.Feedback type="invalid">{validation.first_name && validation.first_name[0]}</Form.Control.Feedback>
              </Col>
              <Col className="p-0">
                <Form.Control placeholder="Last Name" required name="last_name"
                              isInvalid={validation.last_name}/>
                <Form.Control.Feedback type="invalid">{validation.last_name && validation.last_name[0]}</Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <InputGroup className="mb-3">
                <Form.Control type="email" placeholder="E-Mail" required autoComplete="email" name="email"
                              isInvalid={validation.email} onChange={reset}/>
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faAt}/>
                  </InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid">{validation.email && validation.email[0]}</Form.Control.Feedback>
              </InputGroup>
            </Form.Row>
            <Form.Row>
              <Col className="p-0 pr-2">
                <InputGroup className="mb-1">
                  <Form.Control type="password" placeholder="Password" required autoComplete="new-password"
                                name="password1" isInvalid={validation.password1} onChange={reset}/>
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faKey}/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">{validation.password1 && validation.password1[0]}</Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col className="p-0">
                <InputGroup className="mb-1">
                  <Form.Control type="password" placeholder="Repeat Password" required autoComplete="new-password"
                                name="password2" isInvalid={validation.password2} onChange={reset}/>
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faKey} color="blue"/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">{validation.password2 && validation.password2[0]}</Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Form.Row>

            {generic_error && <Alert variant="danger">{generic_error}</Alert>}
            <hr />

            <Button type="submit" variant="primary" className="mr-1">Sign Up</Button>
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
  const onSignup = () => {
    setSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
      success? <SignUpSuccess/>: <SignUpDialog onBack={onBack} onSignup={onSignup} />
  );
}