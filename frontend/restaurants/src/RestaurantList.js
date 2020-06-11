import React, {useContext, useState} from "react";

import {RestaurantCard} from "./RestaurantCard";
import {useQuery} from "react-query";
import {fetchJSON} from "./Fetch";
import {FilterContext} from "./RatingFilter";
import {Alert} from "react-bootstrap";
import {LoginContext} from "./Login";


export function RestaurantList({onSelect, rating}) {
    const [filterRating, setFilterRating] = useContext(FilterContext);
    const {role} = useContext(LoginContext);

    const { status, data, error } = useQuery(
    ['restaurants', {rating: filterRating} ],
    async (key, {rating}) => {
      let url = 'restaurants/';
      if(rating)
        url += `?rating=${rating}`;
      let res = await fetchJSON({
        method: 'GET',
        url
      });
      return res.restaurants;
    }
  );
  const onClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(id);
  };

  let cards = status=='success'? data: [];

  return (
    <>
      {cards.length?
          cards.map(c => <RestaurantCard
      onClick={(e) => onClick(e, c.id)}
      key={c.id}
      id={c.id}
      name={c.name}
      address={c.address}
      reviews_count={c.reviews_count}
      summary={c.summary}
      average_rating={c.average_rating}
      bell={role=='owner' && c.awaits_reply}/>) :
          <Alert variant="info">No resturants.</Alert> }
    </>
  );
}


