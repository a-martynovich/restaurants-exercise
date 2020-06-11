import React, {createRef, useContext, useEffect, useState} from 'react';
import {Row, Col, Container, Card, Alert, Modal, Button, Form} from 'react-bootstrap'
import {faComment, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {queryCache, useMutation, useQuery} from "react-query";
import {EditIcon} from "./EditIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchJSON} from "./Fetch";



function DeleteUser({id, onClose, onDelete, shown}) {
  const [mutate] = useMutation(async (id) => {
    console.log(id);
    let res = await fetchJSON({
        method: 'DELETE',
        url: `users/${id}/`,
      });
      return res;
  }, {
    onSuccess: async (replyData) => {
      console.log(replyData);
      await queryCache.refetchQueries('users');
      onClose();
    }
  });
  const onSubmit = async () => {
    await mutate(id);
  };

  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Delete Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">Are you sure?</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


function EditUser({shown, id, onClose, info}) {
  const formRef = React.createRef();
  const [mutate, {status, data, error, reset}] = useMutation(async (req) => {
    console.log(req);
    let res = await fetchJSON({
        method: 'PATCH',
        url: `users/${req.id}/`,
        body: req.body
      });
      return res;
  }, {
    onSuccess: async (data) => {
      // await queryCache.setQueryData(['restaurant', { id }], data);
      await queryCache.refetchQueries('users');
      onClose();
    }
  });
  const onSubmit = async () => {
    let data = Object.fromEntries(new FormData(formRef.current));
    data.id = id;
    data.username = data.email;
    await mutate({body: data, id: id});
  };

  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {info && <Form ref={formRef}>
          <Form.Group as={Row}>
            <Form.Label column sm={3} md={3} lg={3}>First Name: </Form.Label>
            <Col>
              <Form.Control type="text" name="first_name" defaultValue={info.userName} required onChange={reset}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3} md={3} lg={3}>Last Name: </Form.Label>
            <Col>
              <Form.Control type="text" name="last_name" defaultValue={info.lastName} required onChange={reset}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3} md={3} lg={3}>Email: </Form.Label>
            <Col>
              <Form.Control type="email" name="email" defaultValue={info.email} required onChange={reset}/>
            </Col>
          </Form.Group>
        </Form>}
        {error && <Alert variant="danger">Error</Alert>}
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


function User({id, userHash, userName, lastName, email}) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  return (
    <Card className="mb-3 shadow-sm bg-light">
      {deleteShow && <DeleteUser shown={deleteShow} id={id} onClose={() => setDeleteShow(false)}/> }
      {editShow && <EditUser shown={editShow} id={id} onClose={() => setEditShow(false)} info={{id, userName, lastName, email}}/> }
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
                  <EditIcon className="small"
                            onDelete={() => setDeleteShow(true)}
                            onEdit={() => setEditShow(true)}/>
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
      let res = await fetchJSON({
        method: 'GET',
        url: 'users/'
      });
      return res;
    }
  );

  return (
    <>
      {
        status=='success' &&
          (data? data.map(u =><User id={u.id}
                                    userName={u.first_name}
                                    userHash={u.email_hash}
                                    lastName={u.last_name} email={u.email}/>):
                 <Alert variant="secondary">No users.</Alert>)
      }
    </>
  );
}