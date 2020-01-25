import React from "react";
import Card from "../../shared/components/UI/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import Button from "../../shared/components/FormElements/Button";

export default function PlaceList(props) {
  if (props.places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found</h2>
          <Button to="/places/new">Share Place!</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.places.map(place => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
}
