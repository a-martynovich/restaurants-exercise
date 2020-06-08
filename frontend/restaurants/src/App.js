import './App.css';

import React, {createRef, useContext, useEffect, useState} from 'react';
import {Row, Col, Container} from 'react-bootstrap'

import {NavBar} from './Navbar'
import {Restaurant} from "./Restaurant";
import {RestaurantList} from "./RestaurantList";
import {FilterContext} from "./RatingFilter";
import {Login, LoginContext} from "./Login"
import {SignUp} from "./SignUp";




function RestaurantApp() {
  const [card, setCard] = useState(null);
  const [rating, setRating] = useState(0);
  const onCardSelect = (id) => setCard(id);

  return (
      <FilterContext.Provider value={[setRating]}>
      <Container className="restaurants-main bg-white" as="div">
        <NavBar backButtonVisible={card !== null} onBack={() => setCard(null)}/>

        <Row className="justify-content-center mt-3">
          <Col className="col-md-9">
            {card===null? <RestaurantList onSelect={onCardSelect} rating={rating}/> : <Restaurant id={card}/>}
          </Col>
        </Row>
      </Container>
      </FilterContext.Provider>
  );
}

function Credentials({onLogIn}) {
  const [showSignUp, setShowSignUp] = useState(false);
  const onShowSignUp = () => setShowSignUp(true);
  const onBack = () => setShowSignUp(false);
  const onSignUp = () => {};
  const ctx = useContext(LoginContext);

  return (
      <Container className="restaurants-main bg-white" as="div">
        <NavBar />
        <Row className="justify-content-center restaurants-login-row">
          {/*<SignUp onBack={onBack}/>*/}
          {showSignUp? <SignUp onBack={onBack} />: <Login onSignUp={onShowSignUp} onSuccess={() => ctx.logIn()}/>}
        </Row>
      </Container>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
      <LoginContext.Provider value={{
        loggedIn: loggedIn,
        role: "owner",
        roleName: "Visitor",
        name: "Artem Martynovich",
        logOut: () => {setLoggedIn(false)},
        logIn: () => {setLoggedIn(true)}
      }}>
        {loggedIn? <RestaurantApp /> : <Credentials onLogIn={() => setLoggedIn(true)}/>}
      </LoginContext.Provider>
  );
}

export default App;
