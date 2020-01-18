import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const PLACES = [
  {
    id: "p1",
    title: "New York",
    description: "New York City!",
    imageUrl:
      "https://www.visittheusa.cl/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-04/7010d1e88b80578f3d4e6fc09c2a2379.jpeg?itok=YLMbh1Rm",
    address: "New York",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: "u1"
  },
  {
    id: "p2",
    title: "New York",
    description: "New York City!",
    imageUrl:
      "https://www.visittheusa.cl/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-04/7010d1e88b80578f3d4e6fc09c2a2379.jpeg?itok=YLMbh1Rm",
    address: "New York",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: "u2"
  }
];

export default function UserPlaces() {
  const userId = useParams().userId;
  const loadedPlaces = PLACES.filter(place => place.creatorId === userId);
  return <PlaceList places={loadedPlaces} />;
}
