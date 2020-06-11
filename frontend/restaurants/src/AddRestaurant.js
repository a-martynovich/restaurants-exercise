import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUser, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {Button, Modal, Form, Row, Col, Alert} from "react-bootstrap";
import {queryCache, useMutation} from "react-query";
import {fetchJSON} from "./Fetch";


export function AddRestaurant({shown, onClose}) {
  const [submitAllow, setSubmitAllow] = useState(false);
  const formRef = React.createRef();
  const [mutate, {status, data, error, reset}] = useMutation(async (body) => {
    console.log(body);
    let res = await fetchJSON({
        method: 'POST',
        url: `restaurants/`,
        body: body
      });
      return res.restaurants;
  }, {
    onSuccess: async (reply) => {
      queryCache.setQueryData(['restaurants', {rating: 0}], reply);
      onClose();
    }
  });
  const onSubmit = async () => {
    let data = Object.fromEntries(new FormData(formRef.current));
    console.log('AddRestaurant', data);
    await mutate(data);
  };
  const onChange = () => {
    reset();
    let data = Object.fromEntries(new FormData(formRef.current));
    setSubmitAllow(!!(data.name && data.address && data.summary && data.description));
  };

  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef}>
          <Form.Group as={Row}>
            <Form.Label column sm={1} md={2} lg={1}>Name: </Form.Label>
            <Col>
              <Form.Control type="text" name="name" onChange={onChange}/>
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" onChange={onChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Short Summary:</Form.Label>
            <Form.Control as="textarea" rows="2" name="summary" onChange={onChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Details:</Form.Label>
            <Form.Control as="textarea" rows="4" name="description" onChange={onChange}/>
          </Form.Group>
        </Form>
        {error && <Alert variant="danger">Error</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" disabled={!submitAllow} onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}