import './App.css';

import React, {createRef, useEffect, useState} from 'react';
import {Row, Col, Container} from 'react-bootstrap'

import {NavBar} from './Navbar'
import {Restaurant} from "./Restaurant";
import {RestaurantList} from "./RestaurantList";


function App() {
  const [card, setCard] = useState(null);
  const onCardSelect = (id) => setCard(id);

  return (
    <Container className="restaurants-main bg-white" as="div">
      <NavBar backButtonVisible={card !== null} onBack={() => setCard(null)}/>

      <Row className="justify-content-center mt-3">
        <Col className="col-md-9">
          {card===null? <RestaurantList onSelect={onCardSelect}/> : <Restaurant id={card}/>}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
