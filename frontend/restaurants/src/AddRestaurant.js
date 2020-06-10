import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUser, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import {queryCache, useMutation} from "react-query";
import {fetchJSON} from "./Fetch";


export function AddRestaurant({shown, onClose}) {
  const formRef = React.createRef();
  const [mutate] = useMutation(async (data) => {
    console.log(data);
    let res = await fetchJSON({
        method: 'POST',
        url: `restaurants/`,
        body: data
      });
      return res.restaurants;
  }, {
    onSuccess: async (data) => {
      queryCache.setQueryData(['restaurants', {rating: 0}], data);
      onClose();
    }
  });
  const onSubmit = async () => {
    let data = Object.fromEntries(new FormData(formRef.current));
    console.log('AddRestaurant', data);
    await mutate(data);
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
              <Form.Control type="text" name="name"/>
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Short Summary:</Form.Label>
            <Form.Control as="textarea" rows="2" name="summary"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Details:</Form.Label>
            <Form.Control as="textarea" rows="4" name="description"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}