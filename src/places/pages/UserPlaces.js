import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function UserPlaces() {
  const userId = useParams().userId;
  const [places, setPlaces] = useState();
  const { loading, error, makeRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await makeRequest(`/places/user/${userId}`);
        setPlaces(response.places);
      } catch (e) {}
    };

    fetchPlaces();
  }, [makeRequest, userId]);

  const placeDeleteHandler = placeId => {
    setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loading && <LoadingSpinner asOverlay />}
      {!loading && places && (
        <PlaceList places={places} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
}
