import React from "react";

import {Stars} from "./Stars";


export function Review() {
  return (
    <div className="card border-left-0 border-right-0 border-top-0">
      <div className="row no-gutters">
        <div className="col-md-2 pl-3 pt-3 mr-3">
          <img src="https://www.gravatar.com/avatar/ec85fcb559b6101d45b406cae3b6f29a?s=100"
               className="card-img restaurants-review-avatar"/>
          <p className="text-center restaurants-review-username"><small>Artem</small></p>
        </div>
        <div className="col-md">
          <div className="card-body">
            <span className="align-top flex-nowrap">
              <Stars staticRating={4}/>
              {/*<small className="text-muted align-text-top pl-2">4.1</small>*/}
              <small className="float-right"><b>Last Visit:</b> {new Date().toLocaleDateString()}</small>
            </span>
            <p className="card-text mb-1"><small>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </small></p>
            <p className="card-text align-bottom mb-0">
              <small className="text-muted">{new Date().toLocaleString()}</small>
            </p>

            <div className="d-none mt-2">
              <p className="card-text ml-5 mb-0">
                <small><b>Owner Reply</b></small>
              </p>
              <p className="card-text ml-5 mb-1">
                <small>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </small>
              </p>
              <p className="card-text align-bottom ml-5 mb-0">
                <small className="text-muted">{new Date().toLocaleString()}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

