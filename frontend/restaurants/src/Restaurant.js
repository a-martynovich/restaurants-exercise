import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useQuery } from 'react-query'

import {Reviews} from "./Reviews";
import {Stars} from "./Stars";


export function Restaurant({id}) {
  const [startDate, setStartDate] = useState(null);
  const { status, data, error } = useQuery(
    ['restaurant', { id }],
    async (key, {id}) => {
      // console.log(key, id);
      let d = await fetch('/restaurant.json');
      let j = await d.json();
      return j;
    }
  );

  // console.log(status, data, error);
  let disp_data = data;
  if(status == 'loading') {
    disp_data = {name: '', address: '', short_description: '', long_description: ''};
  }

  return (
      <div className="card mb-3">
        {/*<img src="https://via.placeholder.com/150x70" className="card-img-top restaurant-card-img" alt="..." />*/}
        <div className="card-body">
          <p className="text-center mb-1">
            <h3 className="card-title  d-inline-block mb-0">{disp_data.name}</h3>
          </p>

          <small className="text-muted d-block mb-3 text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
            {disp_data.address}
          </small>

          <p className="card-text">{disp_data.short_description}</p>
          <p className="card-text">{disp_data.long_description}</p>

          <div className="card mt-2">
            <h6 className="card-header">
              Reviews (0)
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={disp_data.average_rating}/>
                <span className="text-muted align-text-top pl-2 mt-1">{disp_data.average_rating}</span>
            </span>
            </h6>
            <div className="card-body p-0">
              <div className="row row-cols-1 no-gutters">
                <div className="col-md">

                  {/*<div className="row">*/}
                  {/*  <div className="col-md-1">*/}
                  {/*      <img src="https://www.gravatar.com/avatar/ec85fcb559b6101d45b406cae3b6f29a?s=100" className="card-img" />*/}
                  {/*      <small className="text-nowrap">Artem Martynovich</small>*/}
                  {/*  </div>*/}
                  {/*  */}
                  {/*</div>*/}

                  <Reviews restaurantId={id}/>

                </div>
              </div>
            </div>
          </div>

          <div className="card mt-2">
            <h6 className="card-header">
              Add Review
            </h6>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col">
                  <span className="d-flex flex-nowrap d-inline-flex mr-2">
                    <Stars />
                  </span>
                  <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                                          todayButton="Today" placeholderText="Last visit date" maxDate={new Date()}
                                          className="form-control border-primary d-inline-flex"/>
                </div>
              </div>
              <div className="row container">
                <div className="form-group w-100">
                  {/*<label htmlFor="exampleFormControlTextarea1">Review:</label>*/}
                  <textarea className="form-control w-100 border-primary" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us what you think"/>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">Submit review</button>
            </div>
          </div>
        </div>
      </div>
  );
}
