import './App.css';

import React, {createRef, useEffect, useState} from 'react';

import {Navbar} from './Navbar'
import {Restaurant} from "./Restaurant";


function App() {
  return (
    <div className="restaurants-main container bg-white">
      <Navbar backButtonVisible={true}/>

      <div className="justify-content-center mt-3 row">
        <div className="col col-md-9">
          <Restaurant/>
        </div>
      </div>
    </div>
  );
}

export default App;
