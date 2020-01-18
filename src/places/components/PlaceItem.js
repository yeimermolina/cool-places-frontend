import React, { useState } from "react";

import Card from "../../shared/components/UI/Card";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UI/Modal";
import Map from "../../shared/components/UI/Map";

export default function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteConfirmation = () => setShowDelete(true);
  const closeDeleteConfirmation = () => setShowDelete(false);

  const handleDelete = () => {
    setShowDelete(false);
    console.log("DELETE!");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDelete}
        onCancel={closeDeleteConfirmation}
        header="Warning"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteConfirmation} inverse>
              CANCEL
            </Button>
            <Button onClick={handleDelete}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger onClick={openDeleteConfirmation}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}
