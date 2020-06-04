import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

import {Review} from "./Review";
import {Stars} from "./Stars";


export function Restaurant() {
  const [startDate, setStartDate] = useState(null);

  return (
      <div className="card mb-3">
        {/*<img src="https://via.placeholder.com/150x70" className="card-img-top restaurant-card-img" alt="..." />*/}
        <div className="card-body">
          <p className="text-center mb-1">
            <h3 className="card-title  d-inline-block mb-0">Restaurant Name</h3>
          </p>

          <small className="text-muted d-block mb-3 text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="red" className="mr-2"/>
            15 Šetalište Kapetana Iva Vizina, Tivat
          </small>

          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p className="card-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
            est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
            tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
            illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>

          <div className="card mt-2">
            <h6 className="card-header">
              Reviews (0)
              <span className="restaurants-stars-span d-inline-block float-right flex-nowrap">
                <Stars staticRating={4.0}/>
                <span className="text-muted align-text-top pl-2 mt-1">4.0</span>
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

                  <Review/>
                  <Review/>

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
