import React, {useContext, useState} from "react";

import {RestaurantCard} from "./RestaurantCard";
import {queryCache, useMutation, useQuery} from "react-query";
import {fetchJSON} from "./Fetch";
import {FilterContext} from "./RatingFilter";
import {Alert, Button, Modal} from "react-bootstrap";
import {LoginContext} from "./Login";

function DeleteRestaurant({id, restaurantId, onClose, shown}) {
  const [mutate] = useMutation(async (reviewid) => {
    console.log(reviewid);
    let res = await fetchJSON({
        method: 'DELETE',
        url: `restaurants/${reviewid}/`,
      });
      return res.reviews;
  }, {
    onSuccess: async (replyData) => {
      console.log(replyData);
      queryCache.setQueryData(['reviews', {id: restaurantId}], replyData);
      await queryCache.refetchQueries(['restaurant', {id: restaurantId}]);
      onClose();
    }
  });
  const onSubmit = async () => {
    await mutate(id);
  };

  return (
    <Modal show={shown} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Delete Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">Are you sure?</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


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
          (status=='success' && <Alert variant="info">No restaurants.</Alert>) }
    </>
  );
}


