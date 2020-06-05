import React from "react";

import {Stars} from "./Stars";


export function Review({rating, lastVisit, userName, userHash, timestamp, comment,
                       ownerReplyComment, ownerReplyTimestamp}) {
  return (
    <div className="card border-left-0 border-right-0 border-top-0">
      <div className="row no-gutters">
        <div className="col-md-2 pl-3 pt-3 mr-3">
          <img src={`https://www.gravatar.com/avatar/${userHash}?s=100`}
               className="card-img restaurants-review-avatar"/>
          <p className="text-center restaurants-review-username"><small>{userName}</small></p>
        </div>
        <div className="col-md">
          <div className="card-body">
            <span className="align-top flex-nowrap">
              <Stars staticRating={rating}/>
              <small className="float-right"><b>Last Visit:</b> {lastVisit}</small>
            </span>
            <p className="card-text mb-1"><small>
              {comment}
            </small></p>
            <p className="card-text align-bottom mb-0">
              <small className="text-muted">{timestamp}</small>
            </p>

            <div className={`${ownerReplyComment? "": "d-none"} mt-2`}>
              <p className="card-text ml-5 mb-0">
                <small><b>Owner Reply</b></small>
              </p>
              <p className="card-text ml-5 mb-1">
                <small>
                  {ownerReplyComment}
                </small>
              </p>
              <p className="card-text align-bottom ml-5 mb-0">
                <small className="text-muted">{ownerReplyTimestamp}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

