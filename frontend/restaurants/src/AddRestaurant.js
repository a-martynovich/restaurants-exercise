import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUser, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";


export function AddRestaurant({shown, onClose}) {
  const onSubmit = () => {

  };
  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={1} md={2} lg={1}>Name: </Form.Label>
            <Col>
              <Form.Control type="text"/>
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Short Summary:</Form.Label>
            <Form.Control as="textarea" rows="2"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Details:</Form.Label>
            <Form.Control as="textarea" rows="4"/>
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