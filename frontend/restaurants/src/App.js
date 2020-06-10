import './App.css';

import React, {createRef, useContext, useEffect, useState} from 'react';
import {Row, Col, Container, Alert} from 'react-bootstrap'
import {queryCache, useMutation, useQuery} from "react-query";

import {AddRestaurant} from './AddRestaurant'
import {NavBar} from './Navbar'
import {Restaurant} from "./Restaurant";
import {RestaurantList} from "./RestaurantList";
import {FilterContext} from "./RatingFilter";
import {Login, LoginContext} from "./Login"
import {SignUp} from "./SignUp";
import {Users} from "./Users";
import {fetchJSON} from "./Fetch";




function RestaurantApp() {
  const [card, setCard] = useState(null);
  const [rating, setRating] = useState(0);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const onCardSelect = (id) => setCard(id);
  const onAddRestaurant = () => {
    setShowAddRestaurant(true);
  };
  const onAddRestaurantClose = () => {
    setShowAddRestaurant(false);
  };
  const onBack = () => setCard(null);

  return (
      <FilterContext.Provider value={[rating, setRating]}>
      <Container className="restaurants-main bg-white" as="div">
        <NavBar backButtonVisible={card !== null}
                onBack={onBack}
                showUsers={showUsers}
                onShowUsers={setShowUsers}
                onAddRestaurant={onAddRestaurant}/>

        <AddRestaurant shown={showAddRestaurant} onClose={onAddRestaurantClose}/>

        <Row className="justify-content-center mt-3">
          <Col className="col-md-9">
            {showUsers?
              <Users/>:
                (card===null? <RestaurantList onSelect={onCardSelect} rating={rating}/> : <Restaurant id={card}/>)}
          </Col>
        </Row>
      </Container>
      </FilterContext.Provider>
  );
}

function Credentials() {
  const [showSignUp, setShowSignUp] = useState(false);
  const onShowSignUp = () => setShowSignUp(true);
  const onBack = () => setShowSignUp(false);
  const onLoginSuccess = () => ctx.logIn();
  const ctx = useContext(LoginContext);

  return (
      <Container className="restaurants-main bg-white" as="div">
        <NavBar />
        <Row className="justify-content-center restaurants-login-row">
          {showSignUp? <SignUp onBack={onBack} />: <Login onSignUp={onShowSignUp} onSuccess={onLoginSuccess}/>}
        </Row>
      </Container>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { status, data, error } = useQuery('user', async (key) => {
    let res = await fetchJSON({
        method: 'OPTIONS',
        url: 'user/'
      });
    return res;
  }, {
    retry: false,
    onSuccess: () => setLoggedIn(true),
    onError: err => setLoggedIn(false)
  });

  return (
      <LoginContext.Provider value={{
        loggedIn,
        ...data,
        logOut: () => {
          setLoggedIn(false);
        },
        logIn: () => {
          setLoggedIn(true);
          queryCache.refetchQueries('user');
        }
      }}>
        {loggedIn? <RestaurantApp /> : <Credentials/>}
      </LoginContext.Provider>
  );
}

export default App;
