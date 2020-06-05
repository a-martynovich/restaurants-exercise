import './App.css';

import React, {createRef, useEffect, useState} from 'react';

import {Navbar} from './Navbar'
import {Restaurant} from "./Restaurant";
import {RestaurantList} from "./RestaurantList";


function App() {
  const [card, setCard] = useState(null);
  const onCardSelect = (id) => setCard(id);

  return (
    <div className="restaurants-main container bg-white">
      <Navbar backButtonVisible={card !== null} onBack={() => setCard(null)}/>

      <div className="justify-content-center mt-3 row">
        <div className="col col-md-9">
          {card===null? <RestaurantList onSelect={onCardSelect}/> : <Restaurant id={card}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
