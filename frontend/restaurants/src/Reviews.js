import {Review} from "./Review";
import React from "react";
import {useQuery} from "react-query";

export function Reviews({restaurantId}) {
  const { status, data, error } = useQuery(
    ['reviews', { id: restaurantId }],
    async (key, {id}) => {
      // console.log(key, id);
      let d = await fetch('/reviews.json');
      let j = await d.json();
      return j;
    }
  );
  // console.log(status, data, error);

  return (
      <>
        {status=='success' && data.map((r) => <Review
            comment={r.comment}
            lastVisit={r.lastVisit}
            timestamp={r.timestamp}
            userName={r.userName}
            userHash={r.userHash}
            rating={r.rating}
            ownerReplyComment={r.ownerReplyComment}
            ownerReplyTimestamp={r.ownerReplyTimestamp}
            key={r.id}
        />)}
      </>
  )
}