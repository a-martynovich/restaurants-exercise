import React, {useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {queryCache, useMutation, useQuery} from 'react-query'

import {Card, Row, Col, Form, FormGroup, Button, Modal} from "react-bootstrap";

import {AddReview} from "./AddReview";
import {Reviews} from "./Reviews";
import {Stars} from "./Stars";
import {LoginContext} from "./Login"
import {EditIcon} from "./EditIcon";
import {fetchJSON} from "./Fetch";


function EditRestaurant({shown, id, onClose, data}) {
  const formRef = React.createRef();
  const [mutate] = useMutation(async (req) => {
    console.log(req);
    let res = await fetchJSON({
        method: 'PATCH',
        url: `restaurants/${req.id}/`,
        body: req.body
      });
      return res;
  }, {
    onSuccess: async (data) => {
      await queryCache.setQueryData(['restaurant', { id }], data);
      await queryCache.refetchQueries('restaurants');
      onClose();
    }
  });
  const onSubmit = async () => {
    let data = Object.fromEntries(new FormData(formRef.current));
    console.log('AddRestaurant', data);
    await mutate({body: data, id: id});
  };

  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && <Form ref={formRef}>
          <Form.Group as={Row}>
            <Form.Label column sm={1} md={2} lg={1}>Name: </Form.Label>
            <Col>
              <Form.Control type="text" name="name" defaultValue={data.name}/>
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" defaultValue={data.address}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Short Summary:</Form.Label>
            <Form.Control as="textarea" rows="2" name="summary" defaultValue={data.summary}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Details:</Form.Label>
            <Form.Control as="textarea" rows="4" name="description" defaultValue={data.description}/>
          </Form.Group>
        </Form>}
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


export function Restaurant({id}) {
  const ctx = useContext(LoginContext);
  const { status, data, error } = useQuery(
    ['restaurant', { id }],
    async (key, {id}) => {
      let url = `restaurants/${id}/`;
      let res = await fetchJSON({
        method: 'GET',
        url
      });
      return res;
    }
  );
  const [showEditRestaurant, setShowEditRestaurant] = useState(false);

  // console.log(status, data, error);
  let disp_data = data;
  if(!data) {
    disp_data = {name: '', address: '', short_description: '', long_description: ''};
  }

  return (
      <Card className="mb-3">
        {/*<img src="https://via.placeholder.com/150x70" className="card-img-top restaurant-card-img" alt="..." />*/}
        <Card.Body>
          <EditRestaurant shown={showEditRestaurant} data={disp_data} id={id} onClose={() => setShowEditRestaurant(false)}/>

          <p className="text-center mb-1">
            <Card.Title as="h3" className="d-inline-block mb-0">{disp_data.name}</Card.Title>
          </p>

          <small className="text-muted d-block mb-3 text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
            {disp_data.address}
          </small>

          <Card.Text>{disp_data.summary}</Card.Text>
          <Card.Text>{disp_data.description}
            {ctx.role=='admin' &&
            <EditIcon className="text-center pl-2 small d-inline" onEdit={()=>setShowEditRestaurant(true)}/>}
          </Card.Text>

          <Card className="mt-2">
            <Card.Header>
              Reviews ({disp_data.reviews_count})
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={disp_data.average_rating}/>
                <span className="text-muted pl-2">{disp_data.average_rating}</span>
            </span>
            </Card.Header>
            <Card.Body className="p-0">
              <Row noGutters>
                <Col md>
                  <Reviews restaurantId={id}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {ctx.role == 'visitor' &&
          <Card className="mt-2">
            <Card.Header as="h6">
              Add Review
            </Card.Header>
            <Card.Body>
              <AddReview restaurantId={id}/>
            </Card.Body>
          </Card>}
        </Card.Body>
      </Card>
  );
}
