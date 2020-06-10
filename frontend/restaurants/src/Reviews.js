import {Review} from "./Review";
import React, {useContext} from "react";
import {useQuery} from "react-query";
import {LoginContext} from "./Login";
import {fetchJSON} from "./Fetch";

export function Reviews({restaurantId}) {
  const { status, data, error } = useQuery(
    ['reviews', { id: restaurantId }],
    async (key, {id}) => {
      let url = `http://localhost:8000/reviews/${id}/`;
      let res = await fetchJSON({
        method: 'GET',
        url
      });
      return res.reviews;
    }
  );
  // console.log(status, data, error);

  return (
      <>
        {status=='success' && data.map((r) => <Review
            id={r.id}
            comment={r.comment}
            lastVisit={r.visited_at}
            timestamp={r.timestamp}
            userName={r.user_name}
            userHash={r.user_hash}
            rating={r.rating}
            ownerReplyComment={r.owner_reply && r.owner_reply.comment}
            ownerReplyTimestamp={r.owner_reply && r.owner_reply.timestamp}
            key={r.id}
        />)}
      </>
  )
}