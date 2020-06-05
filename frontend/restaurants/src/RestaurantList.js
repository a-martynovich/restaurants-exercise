import React from "react";

import {RestaurantCard} from "./RestaurantCard";
import {useQuery} from "react-query";


export function RestaurantList({onSelect}) {
    const { status, data, error } = useQuery(
    ['restaurants', {} ],
    async (key) => {
      // console.log(key, id);
      let d = await fetch('/restaurants.json');
      let j = await d.json();
      return j;
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
      {cards.map(c => <RestaurantCard
      onClick={(e) => onClick(e, c.id)}
      id={c.id}
      name={c.name}
      address={c.address}
      reviews_count={c.reviews_count}
      short_description={c.short_description}
      average_rating={c.average_rating}/>)}
    </>
  );
}
